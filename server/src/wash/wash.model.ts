import { Field, ObjectType } from 'type-graphql'
import { Entity, ManyToOne } from 'typeorm'
import { Action } from '../action/action.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

@Entity()
@ObjectType()
export class Wash extends Action {
  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE', nullable: false})
  readonly vehicle: Vehicle | Vehicle['_id']
}

export enum EWash{
  vehicle = 'vehicle'
}