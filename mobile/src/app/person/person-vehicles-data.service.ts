import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject, Observable } from 'rxjs'
import { map, pluck, switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { AppDataService } from '../app-data.service'
import { EMain } from '../main/main.model'
import { UtilService } from '../util/util.service'
import { EVehicle, Vehicle } from '../vehicle/vehicle.model'

type createArgs = Partial<Vehicle>

type editArgs = Partial<Pick<Vehicle, 'type'>>

type deleteArgs = Pick<Vehicle, '_id'>

@Injectable({
  providedIn: `root`
})
export class PersonVehiclesDataService extends AppDataService<Array<Vehicle>>{

  private readonly createArgs = new BehaviorSubject<createArgs>(null)

  private readonly editArgs = new BehaviorSubject<editArgs>(null)

  private readonly deleteArgs = new BehaviorSubject<deleteArgs>(null)

  protected readonly findBy = `_id`

  protected readonly forMany = true

  protected readonly load = this.apollo.
    query<{ vehiclesOfPerson: Array<Vehicle> }>({
      query: gql`
          {
            vehiclesOfPerson{
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
      pluck(`data`, `vehiclesOfPerson`)
    )

  protected readonly create: Observable<Vehicle> = this.createArgs.pipe(
    map(args => this.utilService.convertToJqlParams(args)),
    switchMap(args => this.apollo.mutate({
      mutation: gql`
        mutation createVehicle {
          createVehicle${args}
        }
    `})),
    pluck(`data`, `createVehicle`)
  )

  protected readonly edit = this.editArgs.pipe(
    map(args => this.utilService.convertToJqlParams(args)),
    switchMap(args => this.apollo.
      mutate({
        mutation: gql`
            mutation editVehicle{
              editVehicle${args}
            }
        `
      })),
    pluck(`data`, `editVehicle`)
  )

  protected readonly delete = this.deleteArgs.pipe(
    map(args => this.utilService.convertToJqlParams(args)),
    switchMap(args => this.apollo.
      mutate({
        mutation: gql`
            mutation deleteVehicle{
              deleteVehicle${args}
            }
        `
      })),
    pluck(`data`, `deleteVehicle`)
  )

  constructor(
    private readonly utilService: UtilService,
    private readonly apollo: Apollo) {
    super()
  }

  createVehicle(value: createArgs) {
    const { createArgs, create } = this
    createArgs.next(value)
    return create
  }

  editVehicle(value: editArgs) {
    const { editArgs, edit } = this
    editArgs.next(value)
    return edit
  }

  deleteVehicle(value: deleteArgs) {
    this.deleteArgs.next(value)
    return this.delete
  }

}