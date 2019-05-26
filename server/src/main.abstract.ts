import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export enum EMain {
  _id = '_id',
  _createDate = '_createDate',
  _updateDate = '_updateDate',
  _version = '_version',
  _type = '_type'
}

@ObjectType()
export abstract class Main extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn(`uuid`)
  readonly [EMain._id]: string

  @Field()
  @CreateDateColumn()
  readonly [EMain._createDate]: Date

  @Field()
  @UpdateDateColumn()
  readonly [EMain._updateDate]: Date

  @Field()
  @VersionColumn()
  readonly [EMain._version]: number

  @Field(()=> String)
  readonly [EMain._type] = this.constructor.name

}