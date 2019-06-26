import { Field, ObjectType } from 'type-graphql'
import { Entity, OneToOne } from 'typeorm'
import { Vehicle } from '../vehicle/vehicle.model'
import { WithPrice } from '../with-price/with-price.abstract'

@Entity()
@ObjectType()
export class Sale extends WithPrice {
  @Field(() => Vehicle)
  @OneToOne(() => Vehicle, { nullable: false })
  readonly vehicle: Vehicle | Vehicle['_id']
}

export enum ESale {
  vehicle = 'vehicle'
}