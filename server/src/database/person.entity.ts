import { Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToOne } from 'typeorm'
import { Phone } from '../phone/phone.entity'
import { VehicleEntity } from './vehicle.entity'
import { WithImageEntity } from './with-image.abstract-entity'

@ObjectType()
@Entity()
export class PersonEntity extends WithImageEntity {

  // @Field(()=> PhoneEntity)
  @OneToOne(() => Phone, { nullable: false })
  phone: Phone

  @Field(()=> [String])
  @Column(`text`, { array: true })
  vehicles: Array<VehicleEntity['_id']> | Array<VehicleEntity>

  @Field(()=> String)
  @Column()
  fullName: string

  @Field(()=> String)
  @Column()
  language: string

  @Field(()=> String)
  @Column()
  currency: string

}