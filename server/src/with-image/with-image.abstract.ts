import { Field, ObjectType } from 'type-graphql'
import { Column } from 'typeorm'
import { Main } from '../main.abstract'

@ObjectType()
export abstract class WithImage extends Main {
  @Field({ nullable: true })
  @Column({ nullable: true })
  readonly image?: string
}

export enum EWithImage {
  image = 'image'
}