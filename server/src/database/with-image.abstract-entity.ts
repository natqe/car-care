import { Field } from 'type-graphql'
import { Column } from 'typeorm'
import { Main } from './main.abstract-entity'

export abstract class WithImageEntity extends Main {
  @Field(() => String)
  @Column()
  readonly image: string
}