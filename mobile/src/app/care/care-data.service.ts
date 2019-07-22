import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'
import { map, pluck, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { EAction } from '../action/action.model'
import { AppDataService } from '../app-data.service'
import { LogService } from '../log/log.service'
import { EMain } from '../main/main.model'
import { UtilService } from '../util/util.service'
import { EWithPrice } from '../with-price/with-price.model'
import { Care, ECare } from './care.model'

@Injectable({
  providedIn: 'root'
})
export class CareDataService extends AppDataService<Array<Care>> {

  protected readonly forMany = true

  protected readonly findBy = `_id`

  private readonly createArgs = new BehaviorSubject<Partial<Care>>(null)

  protected readonly create = this.createArgs.pipe(
    map(args => this.utilService.convertToJqlParams(args)),
    switchMap(args => this.apollo.mutate({
      mutation: gql`
          mutation createCare{
            createCare${args}{
              ${ECare.description}
              ${ECare.type}
              ${ECare.km}
              ${EWithPrice.price}
              ${EWithPrice.currency}
              ${EAction.actionDate}
              ${EMain._id}
              ${EMain._createDate}
              ${EMain._updateDate}
            }
          }
        `,
      fetchPolicy: `no-cache`
    })),
    pluck(`data`, `createCare`),
  )

  constructor(
    private readonly utilService: UtilService,
    private readonly logService: LogService,
    private readonly apollo: Apollo) {
    super()
    logService.debugInstance(this)
  }

  createItem(value: Partial<Care>) {
    const { createArgs, create } = this
    createArgs.next(value)
    create.subscribe()
  }

}
