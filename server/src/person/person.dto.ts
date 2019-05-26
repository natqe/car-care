import { ArgsType, Field } from 'type-graphql'
import { ESession, ISession } from '../session/session.interface'
import { EPerson, Person } from './person.model'

@ArgsType()
export class CreatePersonArgs implements Partial<Person> {

  @Field(() => Number)
  readonly [EPerson.phone]: Person[EPerson.phone]

  @Field(() => Number)
  readonly [EPerson.callingCode]: Person[EPerson.callingCode]

}

@ArgsType()
export class ConfirmPersonArgs implements Partial<ISession> {
  @Field(() => String)
  readonly [ESession.verificationCode]: ISession[ESession.verificationCode]
}