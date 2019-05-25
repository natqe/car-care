import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export enum EMain {
  _id = '_id',
  _createDate = '_createDate',
  _updateDate = '_updateDate',
  _version = '_version',
  _type = '_type'
}

export const { _createDate, _id, _type, _updateDate, _version } = EMain

@ObjectType()
export abstract class Main extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn(`uuid`)
  readonly [_id]: string

  @Field()
  @CreateDateColumn()
  readonly [_createDate]: Date

  @Field()
  @UpdateDateColumn()
  readonly [_updateDate]: Date

  @Field()
  @VersionColumn()
  readonly [_version]: number

  @Field(()=> String)
  readonly [_type] = this.constructor.name

}