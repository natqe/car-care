import { IsDateString, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'
import { ArgsType, Field, Float } from 'type-graphql'
import { Action } from '../action/action.abstract'
import { CreateActionArgs } from '../action/action.dto'
import { Test } from './test.model'

@ArgsType()
export class CreateTestArgs extends CreateActionArgs implements Partial<Test>{
  @Field(() => String)
  @IsDateString()
  readonly expirationDate: Test['expirationDate']
}