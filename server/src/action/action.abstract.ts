import { Field, ObjectType } from 'type-graphql'
import { Column } from 'typeorm'
import { WithPrice } from '../with-price/with-price.abstract'

@ObjectType()
export abstract class Action extends WithPrice{
  @Field(()=> String)
  @Column()
  readonly actionDate: string
}

export enum EAction{
  actionDate = 'actionDate'
}