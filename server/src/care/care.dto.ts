import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator'
import { ArgsType, Field, ID, Int } from 'type-graphql'
import { Vehicle } from '../vehicle/vehicle.model'
import { Care } from './care.model'

@ArgsType()
export class CreateCareArgs implements Partial<Care>{

  @Field(() => ID)
  @IsUUID()
  readonly vehicle: Vehicle['_id']

  @Field(() => String)
  @IsDateString()
  readonly actionDate: Care['actionDate']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly currency: Care['currency']

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly description?: Care['description']

  @Field(() => Int)
  @Min(0)
  @IsInt()
  @IsOptional()
  readonly km?: Care['km']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly type: Care['type']

}