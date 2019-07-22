import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject } from 'rxjs'
import { map, pluck, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { EAction } from '../action/action.model'
import { AppDataService } from '../app-data.service'
import { EMain } from '../main/main.model'
import { EOfVehicle } from '../of-vehicle/of-vehicle.model'
import { UtilService } from '../util/util.service'
import { EWithPrice } from '../with-price/with-price.model'
import { Fuel } from './fuel.model'

@Injectable({
  providedIn: 'root'
})
export class FuelDataService extends AppDataService<Array<Fuel>> {

  protected readonly forMany = true

  protected readonly findBy = `_id`

  private readonly createArgs = new BehaviorSubject<Partial<Fuel>>(null)

  protected readonly create = this.createArgs.pipe(
    map(value => this.utilService.convertToJqlParams(value)),
    switchMap(value => this.apollo.mutate({
      fetchPolicy: `no-cache`,
      mutation: gql`
        mutation createFuel {
          createFuel${value}{
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
    pluck(`data`, `createFuel`)
  )

  constructor(
    private readonly apollo: Apollo,
    private readonly utilService: UtilService) {
    super()
  }

  createItem(value: Partial<Fuel>) {
    const { create, createArgs } = this
    createArgs.next(value)
    create.subscribe()
  }

}
