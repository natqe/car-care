import { Field, Int, ObjectType } from 'type-graphql'
import { Column, DeepPartial, Entity, ManyToOne, ObjectType as typeormObjectType } from 'typeorm'
import { Action } from '../action/action.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

@Entity()
@ObjectType()
export class Care extends Action {

  @Field(() => Vehicle)
  @ManyToOne(() => Vehicle)
  readonly vehicle: Vehicle | Vehicle['_id']

  @Field()
  @Column()
  readonly type: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  readonly description?: string

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  readonly km?: number

}

export enum ECare {
  vehicle = 'vehicle',
  type = 'type',
  description = 'description',
  km = 'km'
}