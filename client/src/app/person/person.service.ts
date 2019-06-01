import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject, of } from 'rxjs'
import { filter, first, pluck, switchMap, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { LanguageService } from '../language/language.service'
import { LogService } from '../log/log.service'
import { Person } from './person.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private readonly logService: LogService,
    private readonly languageService: LanguageService,
    private readonly apollo: Apollo) {
    logService.debugInstance(this)
  }

  private readonly _value = new BehaviorSubject<Person>(null)

  readonly value = this._value.pipe<Person>(filter(value => !!value))

  readonly isConfirm = this.apollo.
    query<{ isConfirmPerson: boolean }>({
      query: gql`{
        isConfirmPerson
      }`,
      fetchPolicy: `no-cache`
    }).
    pipe(pluck('data', 'isConfirmPerson'))

  create({ callingCode, phone }: { callingCode: Person['callingCode'], phone: Person['phone'] }) {

    const { apollo, _value, languageService } = this

    return apollo.
      mutate({
        mutation: gql`
          mutation createPerson {
            createPerson(phone: ${phone}, callingCode: ${callingCode}, language: "${languageService.current}")
          }
      `}).
      pipe(
        pluck('data', 'createPerson'),
        tap(value => {
          if (value) _value.next({ phone, callingCode })
        }),
      )

  }

  confirm(verificationCode: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation createPerson {
          confirmPerson(verificationCode: "${verificationCode}")
        }
      `
    }).
      pipe(pluck('data', 'confirmPerson'))
  }

  vehicles(_id?: Person['_id']) {

    const
      { _value, apollo } = this,
      idPartial = _id ? `_id: "${_id}"` : ``

    return _value.
      pipe(
        pluck(`vehicles`),
        switchMap(
          vehicles => !_id && vehicles ?
            of(vehicles) :
            apollo.query<{ vehiclesOfPerson: Array<any> }>({
              query: gql`
                {
                  vehiclesOfPerson${idPartial}{
                    _id
                  }
                }
            `
            }).pipe(
              pluck(`data`, `vehiclesOfPerson`),
              tap(vehicles => {
                if (!_id) _value.pipe(first()).subscribe(person => {
                  _value.next({ ...person, vehicles })
                })
              })
            )
        )
      )

  }

}
