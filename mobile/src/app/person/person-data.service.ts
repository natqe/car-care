import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'
import { map, mapTo, pluck, switchMap, switchMapTo, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { AppDataService } from '../app-data.service'
import { UtilService } from '../util/util.service'
import { Person, EPerson } from './person.model'
import { EMain } from '../main/main.model';

@Injectable({
  providedIn: `root`
})
export class PersonDataService extends AppDataService<Person>{

  private readonly createArgs = new BehaviorSubject<Partial<Person>>(null)

  private readonly editArgs = new BehaviorSubject<Partial<Pick<Person, 'fullName' | 'language' | 'currency'>>>(null)

  protected readonly create = this.createArgs.pipe(
    map(args => this.utilService.convertToJqlParams(args)),
    switchMap(args => this.apollo.mutate({
      mutation: gql`
        mutation createPerson {
          createPerson${args}{
            ${this.utilService.selectJqlEnums(EMain, EPerson)}
          }
        }
    `})),
    pluck(`data`, `createPerson`)
  )

  protected readonly edit = this.editArgs.pipe(
    switchMap(args => this.apollo.
      mutate({
        fetchPolicy: `no-cache`,
        mutation: gql`
            mutation editPerson{
              editPerson${this.utilService.convertToJqlParams(args)}
            }
        `
      }).
      pipe(
        pluck(`data`, `editPerson`),
        mapTo(args)
      ))
  )

  readonly isConfirm = this.wrapAsync(
    this.apollo.
      query<{ isConfirmPerson: boolean }>({
        query: gql`{
          isConfirmPerson
        }`,
        fetchPolicy: `no-cache`
      }).
      pipe(
        pluck('data', 'isConfirmPerson')
      )
  )

  constructor(
    private readonly utilService: UtilService,
    private readonly apollo: Apollo) {
    super()
  }

  confirmPerson(verificationCode: string) {
    return this.wrapAsync(
      this.apollo.
        mutate({
          mutation: gql`
        mutation createPerson {
          confirmPerson(verificationCode: "${verificationCode}")
        }
      `
        }).
        pipe(pluck('data', 'confirmPerson'))
    )
  }

  editPerson(person: Partial<Pick<Person, 'fullName' | 'language' | 'currency'>>) {
    const { edit, editArgs, editingSuccess } = this
    editArgs.next(person)
    return edit.pipe(switchMapTo(editingSuccess))
  }

  createPerson(person: Partial<Person>) {
    const { create, createArgs, creatingSuccess } = this
    createArgs.next(person)
    return create.pipe(switchMapTo(creatingSuccess))
  }

}