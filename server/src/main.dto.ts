import { IsOptional, IsUUID } from 'class-validator'
import { ArgsType, Field, ID } from 'type-graphql'
import { Main } from './main.abstract'

@ArgsType()
export class IdentityArgs implements Partial<Main> {
  @Field(() => ID, { nullable: true })
  @IsUUID()
  @IsOptional()
  readonly _id?: Main['_id']
}