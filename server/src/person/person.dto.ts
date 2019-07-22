import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString, Length, Matches, Max, Min } from 'class-validator'
import { ArgsType, Field, Int } from 'type-graphql'
import { ELanguage } from '../language/language.enum'
import { IdentityArgs } from '../main.dto'
import { ISession } from '../session/session.interface'
import { Person } from './person.model'

const regexWord = `[a-z\\u05D0-\\u05EA'´\`]+\\.?\\s`

@ArgsType()
export class CreatePersonArgs implements Partial<Person> {

  @Field(() => Int)
  @IsInt()
  @Min(100000000)
  @Max(999999999)
  readonly phone: Person['phone']

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  readonly callingCode: Person['callingCode']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEnum(ELanguage)
  readonly language: Person['language']

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  readonly currency: Person['currency']

}

@ArgsType()
export class ConfirmPersonArgs implements Partial<ISession> {
  @Field(() => String)
  @Length(6)
  @IsNumberString()
  readonly verificationCode: ISession['verificationCode']
}

@ArgsType()
export class EditPersonArgs extends IdentityArgs implements Partial<Person>{

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Matches(RegExp(`^${regexWord}+(${regexWord}*)+$`, `i`))
  readonly fullName?: Person['fullName']

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(ELanguage)
  readonly language?: Person['language']

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly currency?: Person['currency']


}