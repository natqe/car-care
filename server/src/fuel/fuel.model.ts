import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Action } from '../action/action.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

@Entity()
@ObjectType()
export class Fuel extends Action {
  @ManyToOne(() => Vehicle , { onDelete: 'CASCADE', nullable: false})
  readonly vehicle: Vehicle | Vehicle['_id']
}

export enum EFuel{
  vehicle ='vehicle'
}