import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator'
import { ArgsType, Field, Float, ID } from 'type-graphql'
import { Vehicle } from '../vehicle/vehicle.model'
import { Action } from './action.abstract'

@ArgsType()
export class CreateActionArgs implements Partial<Action> {

  @Field(() => ID)
  @IsUUID()
  readonly vehicle: Vehicle['_id']

  @Field(() => String)
  @IsDateString()
  readonly actionDate: Action['actionDate']

  @Field(() => Float, { nullable: true })
  @Min(0)
  @IsOptional()
  readonly price: Action['price']

  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly currency: Action['currency']

}