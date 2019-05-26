import { Field, ObjectType } from 'type-graphql'
import { Column } from 'typeorm'
import { Main } from '../main.abstract'

export enum EWithImage {
  image = 'image'
}

@ObjectType()
export abstract class WithImage extends Main {

  @Field()
  @Column({ nullable: true })
  readonly [EWithImage.image]?: string

}