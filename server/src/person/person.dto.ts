import { ArgsType, Field, Int } from 'type-graphql'
import { ELanguage } from '../language/language.enum'
import { ISession } from '../session/session.interface'
import { Person } from './person.model'

@ArgsType()
export class CreatePersonArgs implements Partial<Person> {

  @Field(() => Int)
  readonly phone: Person['phone']

  @Field(() => Int)
  readonly callingCode: Person['callingCode']

  @Field(() => String)
  readonly language: ELanguage

}

@ArgsType()
export class ConfirmPersonArgs implements Partial<ISession> {
  @Field(() => String)
  readonly verificationCode: ISession['verificationCode']
}

@ArgsType()
export class VehiclesOfPersonArgs implements Partial<Person> {
  @Field(() => String, { nullable: true })
  readonly _id: Person['_id']
}