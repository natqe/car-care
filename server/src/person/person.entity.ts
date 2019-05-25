import { Field, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import { VehicleEntity } from '../database/vehicle.entity'
import { WithImageEntity } from '../database/with-image.abstract-entity'

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode',
  vehicles = 'vehicles',
  fullName = 'fullName',
  language = 'language',
  currency = 'currency'
}

export const { phone, currency, fullName, language, vehicles, callingCode } = EPerson

@ObjectType()
@Entity()
export class Person extends WithImageEntity {

  @Field()
  @Column()
  readonly [phone]: number

  @Field()
  @Column()
  readonly [callingCode]: number

  @Field(() => [String])
  @Column(`text`, { array: true, nullable: true })
  readonly [vehicles]?: Array<VehicleEntity['_id']> | Array<VehicleEntity>

  @Field()
  @Column({ nullable: true })
  readonly [fullName]?: string

  @Field()
  @Column({ nullable: true })
  readonly [language]?: string

  @Field()
  @Column({ nullable: true })
  readonly [currency]?: string

}