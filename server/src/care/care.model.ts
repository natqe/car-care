import { Field, Int, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Action } from '../action/action.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

export enum ECareType {
  period = 'period',
  tire = 'tire',
  mishap = 'mishap',
  other = 'other'
}

@Entity()
@ObjectType()
export class Care extends Action {

  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE', nullable: false})
  readonly vehicle: Vehicle | Vehicle['_id']

  @Field()
  @Column()
  readonly type: ECareType

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