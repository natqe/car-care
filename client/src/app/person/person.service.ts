import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'
import { filter, pluck, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { LanguageService } from '../language/language.service'
import { LogService } from '../log/log.service'
import { UtilService } from '../util/util.service'
import { Person } from './person.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private readonly logService: LogService,
    private readonly languageService: LanguageService,
    private readonly utilService: UtilService,
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

    const { apollo, _value, languageService, utilService } = this

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

}
