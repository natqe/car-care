import { Field, Float, Int, ObjectType } from 'type-graphql'
import { Column } from 'typeorm'
import { OfVehicle } from '../of-vehicle/of-vehicle.abstract'

@ObjectType()
export abstract class WithPrice extends OfVehicle {

  @Field(() => Float, { nullable: true })
  @Column(`float`, { nullable: true })
  readonly price: number

  @Field({ nullable: true})
  @Column({ nullable: true})
  readonly currency: string

}

export enum EWithPrice {
  price = 'price',
  currency = 'currency'
}