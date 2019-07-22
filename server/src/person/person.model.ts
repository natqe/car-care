import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import { ELanguage } from '../language/language.enum'
import { Vehicle } from '../vehicle/vehicle.model'
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

  @Field(()=> String)
  @Column(`text`)
  readonly language: ELanguage

  @Field()
  @Column()
  readonly currency: string

  @Field(() => [String])
  @Column(`text`, { array: true, nullable: true })
  readonly vehicles?: Array<Vehicle['_id']>

  @Field()
  @Column({ nullable: true })
  readonly fullName?: string

}

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode',
  vehicles = 'vehicles',
  fullName = 'fullName',
  language = 'language',
  currency = 'currency'
}