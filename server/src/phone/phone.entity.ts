import { Field, ObjectType } from 'type-graphql'
import { Column, Entity } from 'typeorm'
import { Main } from '../database/main.abstract-entity'

@ObjectType()
@Entity()
export class Phone extends Main {

  @Field()
  @Column({ unique: true })
  readonly value: string

  @Field()
  @Column()
  readonly callingCode: string

  @Field()
  @Column()
readonly  verificationCode: string

}