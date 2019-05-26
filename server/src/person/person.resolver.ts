import { property } from 'lodash'
import { numericCode } from 'utilizes/numeric-code'
import { Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EMain } from '../main.abstract'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { ConfirmPersonArgs, CreatePersonArgs } from './person.dto'
import { Person } from './person.model'

@Resolver(() => Person)
export class PersonResolver {

  @Mutation(() => Boolean)
  async createPerson(@Args() phoneData: CreatePersonArgs, @Session() session: ISession) {

    const getId = property<Person, Person[EMain._id]>(EMain._id)

    if (!session.personId) session.personId = getId(await Person.findOne(phoneData, { select: [`_id`] })) || getId(await Person.create(phoneData).save())

    session.verificationCode = numericCode()
    Logger.log(session.verificationCode, `createPerson.verificationCode`)
    return !!session.personId

  }

  @Query(() => Boolean, { nullable: true })
  isConfirmPerson(@Session() { personId, verificationCode }: ISession) {
    return personId && !verificationCode
  }

  @Mutation(() => Boolean, { nullable: true })
  confirmPerson(@Args() { verificationCode }: ConfirmPersonArgs, @Session() session: ISession) {

    const isConfirm = this.isConfirmPerson(session) || session.verificationCode === verificationCode

    if (isConfirm) delete session.verificationCode

    return isConfirm

  }

}