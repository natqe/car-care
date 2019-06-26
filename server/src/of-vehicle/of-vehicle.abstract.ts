import { Field, ObjectType } from 'type-graphql'
import { Main } from '../main.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

@ObjectType()
export abstract class OfVehicle extends Main {
  @Field(() => Vehicle)
  readonly vehicle: Vehicle | Vehicle['_id']
}

export enum EOfVehicle {
  vehicle = 'vehicle'
}