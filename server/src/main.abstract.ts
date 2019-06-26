import { Field, ID, Int, ObjectType } from 'type-graphql'
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@ObjectType()
export abstract class Main extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn(`uuid`)
  readonly _id: string

  @Field()
  @CreateDateColumn()
  readonly _createDate: string

  @Field()
  @UpdateDateColumn()
  readonly _updateDate: string

  @Field(()=> Int)
  @VersionColumn()
  readonly _version: number

  @Field(()=> String)
  readonly _type = this.constructor.name

}

export enum EMain {
  _id = '_id',
  _createDate = '_createDate',
  _updateDate = '_updateDate',
  _version = '_version',
  _type = '_type'
}