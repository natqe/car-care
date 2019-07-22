import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import get from 'lodash/get'
import isNull from 'lodash/isNull'
import negate from 'lodash/negate'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { filter, first, pluck, switchMap, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { LogService } from '../log/log.service'
import { EMain } from '../main/main.model'
import { UtilService } from '../util/util.service'
import { EVehicle, Vehicle } from '../vehicle/vehicle.model'
import { EPerson, Person } from './person.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private readonly logService: LogService,
    private readonly utilService: UtilService,
    private readonly platform: Platform,
    private readonly apollo: Apollo) {

    logService.debugInstance(this)

  }

  private readonly _value = new BehaviorSubject<Person>(null)

  private readonly _loadingVehicles = new BehaviorSubject<boolean>(null)

  readonly value = this._value.pipe<Person>(filter(negate(isNull)))

  readonly loadingVehicles = this._loadingVehicles.pipe<boolean>(filter(negate(isNull)))

  readonly isConfirm = this.apollo.
    query<{ isConfirmPerson: boolean }>({
      query: gql`{
        isConfirmPerson
      }`,
      fetchPolicy: `no-cache`
    }).
    pipe(pluck('data', 'isConfirmPerson'))

  create(person: { callingCode: Person['callingCode'], phone: Person['phone'], language: Person['language'], currency: Person['currency'] }) {

    const { apollo, utilService } = this

    return apollo.
      mutate({
        mutation: gql`
          mutation createPerson {
            createPerson${utilService.convertToJqlParams(person)}
          }
      `}).
      pipe(
        pluck('data', 'createPerson'),
        tap(value => {
          if (value) this.merge(person)
        })
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

  fetchVehicles(_id?: Person['_id']) {

    const
      { _value, apollo, _loadingVehicles } = this,
      queryArgs = _id ? `(_id: "${_id}")` : ``,
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
                    vehiclesOfPerson${queryArgs}{
                      ${EVehicle.color}
                      ${EVehicle.gallery}
                      ${EVehicle.hand}
                      ${EVehicle.image}
                      ${EVehicle.isActive}
                      ${EVehicle.km}
                      ${EVehicle.license}
                      ${EVehicle.model}
                      ${EVehicle.producer}
                      ${EVehicle.productionDate}
                      ${EVehicle.type}
                      ${EMain._id}
                      ${EMain._createDate}
                      ${EMain._updateDate}
                    }
                  }
              `,
              fetchPolicy: `no-cache`
            }).
              pipe(
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
  /**
   * @description Change some properties on local
   * @author Natan Farkash
   */
  merge(value: Partial<Person>) {
    const { _value } = this
    _value.next({ ..._value.value, ...value })
  }
  /**
   * @description Edit properties on server
   * @author Natan Farkash
   */
  edit(person: Partial<Pick<Person, 'fullName' | 'language' | 'currency'>>): Observable<boolean> {

    const { apollo, utilService } = this

   return apollo.mutate({
     mutation: gql`
        mutation{
          editPerson${utilService.convertToJqlParams(person)}
        }
      `
   }).
     pipe(
       pluck(`data`, `editPerson`),
       tap<boolean>(response => {
         if(response) this.merge(person)
       })
    )

  }

}
