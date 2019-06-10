import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import isNull from 'lodash/isNull'
import negate from 'lodash/negate'
import { BehaviorSubject } from 'rxjs'
import { filter, first, pluck, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { LogService } from '../log/log.service'
import { Person } from '../person/person.model'
import { PersonService } from '../person/person.service'

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

  readonly loading = this._loading.pipe<FullNameService['_loading']['value']>(filter(negate(isNull)))

  readonly value = this._value.pipe<FullNameService['_value']['value']>(filter(negate(isNull)))

  constructor(
    private readonly logService: LogService,
    private readonly personService: PersonService,
    private readonly apollo: Apollo) {

    logService.debugInstance(this)

    const { _value } = this

    personService.value.pipe(filter(value => !!value), filter(({ fullName }) => fullName !== _value.value)).subscribe(({ fullName }) => _value.next(fullName))

  }

  getValue({ _id, cache = true }: IGetValueArgs = { cache: true }) {

    const
      { _value, _loading, apollo, personService } = this,
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
            personService.merge({ fullName })
          }
        })
      )

    return result.pipe(tap(() => _loading.next(false)))

  }

  setValue(fullName: Person['fullName']) {
    const { _value, _loading, personService } = this
    if (_value.value !== fullName) {
      _loading.next(true)
      personService.edit({ fullName }).
        pipe(
          tap(() => _loading.next(false))
        ).
        subscribe()
    }
  }

}
