import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import { VehicleEntity } from '../database/vehicle.entity'
import { WithImage } from '../with-image/with-image.abstract'

@ObjectType()
@Entity()
export class Person extends WithImage {

  @Field(()=> Int)
  @Column()
  readonly phone: number

  @Field(()=> Int)
  @Column()
  readonly callingCode: number

  @Field(() => [String])
  @Column(`text`, { array: true, nullable: true })
  readonly vehicles?: Array<VehicleEntity['_id']> | Array<VehicleEntity>

  @Field()
  @Column({ nullable: true })
  readonly fullName?: string

  @Field()
  @Column({ nullable: true })
  readonly language?: string

  @Field()
  @Column({ nullable: true })
  readonly currency?: string

}

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode',
  vehicles = 'vehicles',
  fullName = 'fullName',
  language = 'language',
  currency = 'currency'
}