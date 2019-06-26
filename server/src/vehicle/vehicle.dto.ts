import { IsArray, IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'
import { Vehicle } from './vehicle.model'

@ArgsType()
export class CreateVehicleArgs implements Partial<Vehicle> {

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly color: Vehicle['color']

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  @Max(10)
  readonly hand: Vehicle['hand']

  @Field(() => Int)
  @IsInt()
  @Min(0)
  readonly km: Vehicle['km']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly license: Vehicle['license']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly model: Vehicle['model']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly producer: Vehicle['producer']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly type: Vehicle['type']

  @Field(() => String)
  @IsDateString()
  readonly productionDate: Vehicle['productionDate']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly image: Vehicle['image']

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional({ each: true })
  @IsOptional()
  readonly gallery: Vehicle['gallery']

}