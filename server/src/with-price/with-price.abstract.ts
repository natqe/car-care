import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Column } from 'typeorm'
import { OfVehicle } from '../of-vehicle/of-vehicle.abstract'

@ObjectType()
export abstract class WithPrice extends OfVehicle {

  @Field(() => Float)
  @Column(`float`)
  readonly price: number

  @Field()
  @Column()
  readonly currency: string

}

export enum EWithPrice {
  price = 'price',
  currency = 'currency'
}