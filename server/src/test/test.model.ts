import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Action } from '../action/action.abstract'
import { Main } from '../main.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

@Entity()
@ObjectType()
export class Test extends Action {

  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE', nullable: false})
  readonly vehicle: Vehicle | Vehicle['_id']

  @Field()
  @Column()
  readonly expirationDate: string

}

export enum ETest {
  vehicle = 'vehicle',
  expirationDate = 'expirationDate'
}