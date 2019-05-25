import { Field, ObjectType } from 'type-graphql'
import { Column } from 'typeorm'
import { Main } from './main.abstract-entity'

export enum EWithImageEntity {
image = 'image'
}

export const { image } = EWithImageEntity

@ObjectType()
export abstract class WithImageEntity extends Main {

  @Field()
  @Column({ nullable: true })
  readonly [image]?: string

}