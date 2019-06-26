import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { Action } from '../action/action.abstract'
import { Main } from '../main.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

@Entity()
@ObjectType()
export class Test extends Action {

  @Field(() => Vehicle)
  @ManyToOne(() => Vehicle)
  readonly vehicle: Vehicle | Vehicle['_id']

  @Field()
  @Column()
  readonly actionDate: string

  @Field(()=>Int)
  @Column({ nullable: true })
  readonly price: number

  @Field()
  @Column()
  readonly currency: string

  @Field()
  @Column()
  readonly expirationDate: string

}

export enum ETest {
  vehicle = 'vehicle',
  actionDate = 'actionDate',
  price = 'price',
  currency = 'currency',
  expirationDate = 'expirationDate'
}