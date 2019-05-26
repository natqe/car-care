import { Field, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import { VehicleEntity } from '../database/vehicle.entity'
import { WithImage } from '../with-image/with-image.abstract'

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode',
  vehicles = 'vehicles',
  fullName = 'fullName',
  language = 'language',
  currency = 'currency'
}

@ObjectType()
@Entity()
export class Person extends WithImage {

  @Field()
  @Column()
  readonly [EPerson.phone]: number

  @Field()
  @Column()
  readonly [EPerson.callingCode]: number

  @Field(() => [String])
  @Column(`text`, { array: true, nullable: true })
  readonly [EPerson.vehicles]?: Array<VehicleEntity['_id']> | Array<VehicleEntity>

  @Field()
  @Column({ nullable: true })
  readonly [EPerson.fullName]?: string

  @Field()
  @Column({ nullable: true })
  readonly [EPerson.language]?: string

  @Field()
  @Column({ nullable: true })
  readonly [EPerson.currency]?: string

}