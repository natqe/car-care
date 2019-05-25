import { get } from 'lodash'
import { numericCode } from 'utilizes/numeric-code'
import { Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EMain } from '../database/main.abstract-entity'
import { Session } from '../session/session.decorator'
import { ESession, ISession } from '../session/session.interface'
import { ConfirmPersonArgs, CreatePersonArgs } from './person.dto'
import { Person } from './person.entity'

@Resolver(() => Person)
export class PersonResolver {

  @Query(() => Boolean, { nullable: true })
  isConfirmPerson(@Session() session: ISession) {
    return session[ESession.personId] && !session[ESession.verificationCode]
  }

  @Mutation(() => Boolean)
  async createPerson(@Args() phoneData: CreatePersonArgs, @Session() session: ISession) {

    if (!session[ESession.personId]) session[ESession.personId] = get(await Person.findOne(phoneData, { select: [EMain._id] }), EMain._id) ||
      get(await Person.create(phoneData).save(), EMain._id)
    session[ESession.verificationCode] = numericCode()
Logger.log(session[ESession.verificationCode], `createPerson.verificationCode`)
    return !!session[ESession.personId]

  }

  @Mutation(() => Boolean, { nullable: true })
  async confirmPerson(@Args() { verificationCode }: ConfirmPersonArgs, @Session() session: ISession) {
    Logger.log(session)
    const  isConfirm = this.isConfirmPerson(session) || session[ESession.verificationCode] === verificationCode

    if (isConfirm) delete session[ESession.verificationCode]

    return isConfirm

  }

}