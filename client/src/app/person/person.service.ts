import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { EPerson, Person } from './person.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private readonly apollo: Apollo) { }

  private readonly _value = new BehaviorSubject<Person>(null)

  readonly value = this._value.pipe<Person>(filter(value => !!value))

  readonly isConfirm = this.apollo.
    query<{ isConfirmPerson: boolean }>({
      query: gql`{
        isConfirmPerson
      }`
    }).
    pipe(map(({ data: { isConfirmPerson } }) => isConfirmPerson))

  create({ callingCode, phone }: { callingCode: Person[EPerson.callingCode], phone: Person[EPerson.phone] }) {

    const { apollo, _value } = this

    return apollo.
      mutate({
        mutation: gql`
          mutation createPerson {
            createPerson(phone: ${phone}, callingCode: ${callingCode})
          }
      `}).
      pipe(map(({ data: { createPerson } }) => {

        if (createPerson) _value.next({ phone, callingCode })

        return createPerson

      }))

  }

  confirm(verificationCode: string) {

    return this.apollo.mutate({
      mutation: gql`
        mutation createPerson {
          confirmPerson(verificationCode: "${verificationCode}")
        }
      `
    }).
      pipe(map(({ data: { confirmPerson } }) => confirmPerson))

  }

}
