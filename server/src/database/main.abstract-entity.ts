import { Field, ID, ObjectType } from 'type-graphql'
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

@ObjectType()
export abstract class Main extends BaseEntity {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly _id: string

  @Field()
  @CreateDateColumn()
  readonly _createDate: Date

  @Field()
  @UpdateDateColumn()
  readonly _updateDate: Date

  @Field()
  @VersionColumn()
  readonly _version: number

  @Field()
  readonly _type: string = this.constructor.name

}