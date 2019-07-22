import isEqual from 'lodash/isEqual'
import maxBy from 'lodash/maxBy'
import remove from 'lodash/remove'
import uniqWith from 'lodash/uniqWith'
import { from, of } from 'rxjs'
import { map, switchMap, switchMapTo, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { CallingCode } from '../calling-code/calling-code.model'
import { LogService } from '../log/log.service'
import { Country } from './country.model'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly platform: Platform,
    private readonly logService: LogService,
    private readonly storage: Storage) {
    logService.debugInstance(this)
  }

  private readonly keyStorage = `country`

  readonly all = from(this.platform.ready()).pipe(
    switchMapTo<Array<Country>>(this.storage.get(this.keyStorage)),
    switchMap(
      value => value ?
        of(value) :
        this.httpClient.get<typeof value>(`https://restcountries.eu/rest/v2/all?fields=name;nativeName;callingCodes;population;currencies;languages;flag`).pipe(tap(value => {

          for (const { callingCodes } of value) {

            for (let index = 0;index < callingCodes.length;++index) callingCodes[index] = +(callingCodes[index] as any).replace(/\s+/g, ``)

            remove(callingCodes, callingCode => !callingCode)

          }

          remove(value, ({ callingCodes, population }) => !callingCodes.length || !population)

          for (const { currencies } of value) remove(currencies, ({ code, name: currencyName }) => !code || !currencyName || code === `(none)`)

          value.sort((a, b) => b.population - a.population)

          this.storage.set(this.keyStorage, value)

        }))
    )
  )

  readonly languages = this.all.pipe(map(value => uniqWith(value.flatMap(({ languages }) => languages.filter(Boolean)), isEqual)))

  readonly callingCodes = this.all.pipe(
    map(countries => countries.flatMap(({ flag, name, nativeName, callingCodes }) => callingCodes.map(value => (<CallingCode>{ value, flag, nativeName, name }))))
  )

  readonly default = this.all.pipe(
    map(value => {

      const
        { documentElement: { lang } } = document,
        matchesCountries = value.filter(({ languages }) => languages.some(({ iso639_1 }) => iso639_1 === lang)),
        matchesCountriesFirstLanguage = matchesCountries.filter(({ languages: [{ iso639_1 }] }) => iso639_1 === lang)

      return this.maxByPopulation(matchesCountriesFirstLanguage.length ? matchesCountriesFirstLanguage : matchesCountries)

    }),
    switchMap(value => value ? of(value) : this.biggest)
  )

  readonly biggest = this.all.pipe(map(value => this.maxByPopulation(value)))

  private maxByPopulation(test: Array<Country>) {
    return maxBy(test, `population`)
  }

}
