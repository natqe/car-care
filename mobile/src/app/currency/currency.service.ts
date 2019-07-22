import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isNull from 'lodash/isNull'
import negate from 'lodash/negate'
import uniqBy from 'lodash/uniqBy'
import { BehaviorSubject, from, of } from 'rxjs'
import { filter, first, map, mapTo, pluck, switchMap, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { CountryService } from '../country/country.service'
import { LogService } from '../log/log.service'
import { PersonDataService } from '../person/person-data.service'
import { EPerson, Person } from '../person/person.model'
import { Currency, ECurrency } from './currency.model'

interface IGetValueArgs {
  readonly _id?: Person['_id']
  readonly cache?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly tempCurrencyStorageKey = `tempCurrency`

  private readonly _value = new BehaviorSubject<Currency>(null)

  private readonly _loading = new BehaviorSubject<boolean>(null)

  private readonly _tempCurrency = new BehaviorSubject<Currency>(null)

  readonly tempCurrency = this._tempCurrency.pipe(
    tap(currency => {

      const { storage, tempCurrencyStorageKey } = this

      if (!currency) from(storage.get(tempCurrencyStorageKey)).
        pipe(
          switchMap(fromStorage => fromStorage ? of(fromStorage) : this.getValue()),
          tap(value => this._tempCurrency.next(value))
        ).
        subscribe()

    }),
    filter<Currency>(negate(isNull))
  )

  readonly loading = this._loading.pipe<CurrencyService['_loading']['value']>(filter(negate(isNull)))

  readonly value = this._value.pipe<CurrencyService['_value']['value']>(filter(negate(isNull)))

  readonly all = this.countryService.all.pipe(
    map(value => uniqBy<Currency>(value.flatMap(({ currencies }) => currencies), ECurrency.code)),
  )

  constructor(
    private readonly logService: LogService,
    private readonly apollo: Apollo,
    private readonly storage: Storage,
    private readonly personDataService: PersonDataService,
    private readonly countryService: CountryService) {

    logService.debugInstance(this)

    const { _value } = this

    personDataService.value.
      pipe(
        filter(value => !!get(value, EPerson.currency)),
        filter(({ currency }) => currency !== get(_value.getValue(), ECurrency.code)),
        switchMap(({ currency }) => this.getCurrencyObject(currency)),
        filter(value => !!value),
        tap(result => _value.next(result))
      ).
      subscribe()

  }

  private getCurrencyObject(byCode: Currency['code']) {
    return this.all.
      pipe(
        first(),
        map(items => items.find(({ code }) => code === byCode))
      )
  }

  getValue({ _id, cache = true }: IGetValueArgs = { cache: true }) {

    const
      { _value, _loading, apollo, personDataService } = this,
      queryArgs = _id ? `(_id: "${_id}")` : ``

    _loading.next(true)

    const result = _value.value && !_id && cache ? _value.pipe(first()) : apollo.query<{ currencyOfPerson: Person['currency'] }>({
      query: gql`
      {
        currencyOfPerson${queryArgs}
      }
    `,
      fetchPolicy: `no-cache`
    }).
      pipe(
        pluck(`data`, `currencyOfPerson`),
        tap(currency => {
          if (!_id) personDataService.patch({ currency })
        }),
        switchMap(currency => this.getCurrencyObject(currency))
      )

    return result.pipe(tap(() => _loading.next(false)))

  }

  setValue(currency: Currency['code'] | Currency) {

    if (typeof currency !== 'string') currency = currency.code

    const { _value, personDataService, _loading } = this

    _loading.next(true)

    const result = _value.value.code === currency ? of(true) : personDataService.editPerson({ currency })

    return result.pipe(tap(() => _loading.next(false)))

  }

  setTempCurrency(currency: Currency['code'] | Currency) {

    const { storage, tempCurrencyStorageKey, _tempCurrency } = this

    return of(currency).
      pipe(
        switchMap(currency => typeof currency !== 'string' ? of(currency) : this.getCurrencyObject(currency)),
        switchMap(currency => isEqual(currency, _tempCurrency.value) ? of(true) : from(storage.set(tempCurrencyStorageKey, currency)).pipe(
          tap(() => _tempCurrency.next(currency)),
          mapTo(true)
        ))
      )

  }

}
