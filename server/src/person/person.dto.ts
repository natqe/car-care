import { ArgsType, Field } from 'type-graphql'
import { ESession, ISession, verificationCode } from '../session/session.interface'
import { callingCode, EPerson, Person, phone } from './person.entity'

@ArgsType()
export class CreatePersonArgs implements Partial<Person> {

  @Field(() => Number)
  readonly [phone]: Person[EPerson.phone]

  @Field(() => Number)
  readonly [callingCode]: Person[EPerson.callingCode]

}

@ArgsType()
export class ConfirmPersonArgs implements Partial<ISession> {
  @Field(() => String)
  readonly [verificationCode]: ISession[ESession.verificationCode]
}