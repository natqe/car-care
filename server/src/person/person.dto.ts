import { ArgsType, Field, Int } from 'type-graphql'
import { ISession } from '../session/session.interface'
import { Person } from './person.model'

@ArgsType()
export class CreatePersonArgs implements Partial<Person> {

  @Field(() => Int)
  readonly phone: Person['phone']

  @Field(() => Int)
  readonly callingCode: Person['callingCode']

}

@ArgsType()
export class ConfirmPersonArgs implements Partial<ISession> {
  @Field(() => String)
  readonly verificationCode: ISession['verificationCode']
}