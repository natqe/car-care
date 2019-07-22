import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'
import { map, pluck, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { EAction } from '../action/action.model'
import { AppDataService } from '../app-data.service'
import { EMain } from '../main/main.model'
import { UtilService } from '../util/util.service'
import { ETest, Test } from './test.model'

@Injectable({
  providedIn: 'root'
})
export class TestDataService extends AppDataService<Array<Test>> {

  protected readonly forMany = true

  protected readonly findBy = `_id`

  private readonly createArgs = new BehaviorSubject<Partial<Test>>(null)

  protected readonly create = this.createArgs.pipe(
    map(value => this.utilService.convertToJqlParams(value)),
    switchMap(value => this.apollo.mutate({
      fetchPolicy: `no-cache`,
      mutation: gql`
        mutation createTest {
          createTest${value}{
            ${ETest.expirationDate}
            ${EAction.actionDate}
            ${EMain._id}
            ${EMain._createDate}
            ${EMain._updateDate}
          }
        }
      `
    })),
    pluck(`data`, `createTest`)
  )

  constructor(
    private readonly apollo: Apollo,
    private readonly utilService: UtilService) {
    super()
  }

  createItem(value: Partial<Test>) {
    const { create, createArgs } = this
    createArgs.next(value)
    create.subscribe()
  }

}
