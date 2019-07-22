import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import isNull from 'lodash/isNull'
import negate from 'lodash/negate'
import { BehaviorSubject, of } from 'rxjs'
import { filter, first, pluck, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { LogService } from '../log/log.service'
import { PersonDataService } from '../person/person-data.service'
import { Person } from '../person/person.model'

interface IGetValueArgs {
  readonly _id?: Person['_id']
  readonly cache?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class FullNameService {

  private readonly _value = new BehaviorSubject<Person['fullName']>(null)

  private readonly _loading = new BehaviorSubject<boolean>(null)

  private readonly wordPattern = `[a-z\\u05D0-\\u05EA'´\`]+\\.?\\s`

  readonly pattern = RegExp(`^${this.wordPattern}+(${this.wordPattern}*)+$`, `i`)

  readonly loading = this._loading.pipe<FullNameService['_loading']['value']>(filter(negate(isNull)))

  readonly value = this._value.pipe<FullNameService['_value']['value']>(filter(negate(isNull)))

  constructor(
    private readonly logService: LogService,
    private readonly personDataService: PersonDataService,
    private readonly apollo: Apollo) {

    logService.debugInstance(this)

    const { _value } = this

    personDataService.value.pipe(filter(value => !!value), filter(({ fullName }) => fullName !== _value.value)).subscribe(({ fullName }) => _value.next(fullName))

  }

  getValue({ _id, cache = true }: IGetValueArgs = { cache: true }) {

    const
      { _value, _loading, apollo, personDataService } = this,
      queryArgs = _id ? `(_id: "${_id}")` : ``

    _loading.next(true)

    const result = _value.value && !_id && cache ? _value.pipe(first()) : apollo.query<{ fullNameOfPerson: Person['fullName'] }>({
      query: gql`
      {
        fullNameOfPerson${queryArgs}
      }
    `,
      fetchPolicy: `no-cache`
    }).
      pipe(
        pluck(`data`, `fullNameOfPerson`),
        tap(fullName => {
          if (!_id) {
            personDataService.patch({ fullName })
          }
        })
      )

    return result.pipe(tap(() => _loading.next(false)))

  }

  setValue(fullName: Person['fullName']) {

    const { _value, _loading, personDataService } = this

    _loading.next(true)

    const result = _value.value === fullName ? of(true) : personDataService.editPerson({ fullName })

    return result.pipe(tap(() => _loading.next(false)))

  }

}
