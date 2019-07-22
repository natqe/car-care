import { IsInt, IsNotEmpty, IsString, Min, ValidateIf } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'
import { CreateActionArgs } from '../action/action.dto'
import { Care, ECareType } from './care.model'

const typeIs = (...types: Array<ECareType>)=> ({ type }: CreateCareArgs)=> types.includes(type)

@ArgsType()
export class CreateCareArgs extends CreateActionArgs implements Partial<Care>{

  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  @ValidateIf(typeIs(ECareType.mishap, ECareType.other))
  readonly description?: Care['description']

  @Field(() => Int, { nullable: true })
  @Min(0)
  @IsInt()
  @ValidateIf(typeIs(ECareType.period))
  readonly km?: Care['km']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly type: Care['type']

}