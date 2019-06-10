import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import get from 'lodash/get'
import isNull from 'lodash/isNull'
import negate from 'lodash/negate'
import { BehaviorSubject, of } from 'rxjs'
import { filter, first, pluck, switchMap, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { LanguageService } from '../language/language.service'
import { LogService } from '../log/log.service'
import { UtilService } from '../util/util.service'
import { Vehicle } from '../vehicle/vehicle.model'
import { EPerson, Person } from './person.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private readonly logService: LogService,
    private readonly languageService: LanguageService,
    private readonly utilService: UtilService,
    private readonly platform: Platform,
    private readonly apollo: Apollo) {

    logService.debugInstance(this)

    platform.ready().then(()=> this.merge({ language: languageService.current }))

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

  create({ callingCode, phone }: { callingCode: Person['callingCode'], phone: Person['phone'] }) {

    const { apollo, languageService } = this

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
          if (value) this.merge({ phone, callingCode })
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
            // of({
            //   data: {
            //     vehiclesOfPerson: [
            //       <Vehicle>{
            //         _id: 'sdfsdfsdsdfasdfkasjdfklasjdf;asdjkfasdf',
            //         image: `https://article.images.consumerreports.org/prod/content/dam/CRO%20Images%202017/Magazine-Articles/April/CR-Inline-top-picks-Audi-02-17`,
            //         model: `s3`,
            //         producer: `Dialim`,
            //         license: `44-896-30`
            //       }
            //     ]
            //   }
            // }).
            apollo.query<{ vehiclesOfPerson: Array<Vehicle> }>({
              query: gql`
                  {
                    vehiclesOfPerson${queryArgs}{
                      _id
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
  edit(person: Partial<Pick<Person, 'fullName' | 'language'>>) {

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
       tap(response => {
         if(response) this.merge(person)
       })
    )


  }

}
