import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'
import { map, pluck, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { EAction } from '../action/action.model'
import { AppDataService } from '../app-data.service'
import { EMain } from '../main/main.model'
import { UtilService } from '../util/util.service'
import { EWithPrice } from '../with-price/with-price.model'
import { Wash } from './wash.model'

@Injectable({
  providedIn: 'root'
})
export class WashDataService extends AppDataService<Array<Wash>> {

  protected readonly forMany = true

  protected readonly findBy = `_id`

  private readonly createArgs = new BehaviorSubject<Partial<Wash>>(null)

  protected readonly create = this.createArgs.pipe(
    map(value => this.utilService.convertToJqlParams(value)),
    switchMap(value => this.apollo.mutate({
      fetchPolicy: `no-cache`,
      mutation: gql`
        mutation createWash {
          createWash${value}{
            ${EAction.actionDate}
            ${EWithPrice.currency}
            ${EWithPrice.price}
            ${EMain._id}
            ${EMain._createDate}
            ${EMain._updateDate}
          }
        }
      `
    })),
    pluck(`data`, `createWash`)
  )

  constructor(
    private readonly apollo: Apollo,
    private readonly utilService: UtilService) {
    super()
  }

  createItem(value: Partial<Wash>) {
    const { create, createArgs } = this
    createArgs.next(value)
    create.subscribe()
  }

}
