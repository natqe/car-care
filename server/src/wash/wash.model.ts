import { Field, ObjectType } from 'type-graphql'
import { Entity, ManyToOne } from 'typeorm'
import { Action } from '../action/action.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

@Entity()
@ObjectType()
export class Wash extends Action {
  @Field(() => Vehicle)
  @ManyToOne(() => Vehicle, { nullable: false })
  readonly vehicle: Vehicle | Vehicle['_id']
}

export enum EWash{
  vehicle = 'vehicle'
}