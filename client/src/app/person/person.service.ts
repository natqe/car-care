import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import get from 'lodash/get'
import { BehaviorSubject, of } from 'rxjs'
import { filter, first, pluck, switchMap, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { LanguageService } from '../language/language.service'
import { LogService } from '../log/log.service'
import { Vehicle } from '../vehicle/vehicle.model'
import { EPerson, Person } from './person.model'

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

  private readonly _loadingVehicles = new BehaviorSubject<boolean>(null)

  readonly value = this._value.pipe(filter(value => !!value))

  readonly loadingVehicles = this._loadingVehicles.pipe(filter(value => value !== null))

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
      { _value, apollo, _loadingVehicles } = this,
      idPartial = _id ? `_id: "${_id}"` : ``,
      loadingFinished = () => _loadingVehicles.next(false)

    _loadingVehicles.next(true)

    return _value.
      pipe(
        first(),
        switchMap(person => {

          const vehicles = get(person, EPerson.vehicles)

          return !_id && vehicles ?
            of(vehicles).pipe(tap(loadingFinished)) :
            apollo.query<{ vehiclesOfPerson: Array<Vehicle> }>({
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
              }),
              tap(loadingFinished)
            )

        })
      )

  }

}
