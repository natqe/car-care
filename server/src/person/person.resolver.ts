import { property } from 'lodash'
import { numericCode } from 'utilizes/numeric-code'
import { Inject, Logger } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PLIVO_CLIENT } from '../config/constants'
import { VERIFICATION_CODE_SMS } from '../language/language.keys'
import { LanguageService } from '../language/language.service'
import { EMain } from '../main.abstract'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { ConfirmPersonArgs, CreatePersonArgs } from './person.dto'
import { Person } from './person.model'

@Resolver(() => Person)
export class PersonResolver {

  constructor(
    @Inject(PLIVO_CLIENT)
    private readonly plivoClient,
    private readonly languageService: LanguageService) { }

  // @Mutation(() => Boolean)
  @Mutation(() => String)
  async createPerson(@Args() { language, ...phoneData }: CreatePersonArgs, @Session() session: ISession) {

    const
      getId = property<Person, Person['_id']>(EMain._id),
      { phone, callingCode } = phoneData

    if (!session.personId) session.personId = getId(await Person.findOne(phoneData, { select: [`_id`] })) || getId(await Person.create(phoneData).save())

    session.verificationCode = numericCode()

    // this.plivoClient.messages.create(
    //   `Vehicles App`,
    //   `${callingCode}${phone}`,
    //   await this.languageService.valueOf({
    //     language,
    //     token: VERIFICATION_CODE_SMS,
    //     locals: {
    //       verificationCode: session.verificationCode
    //     }
    //   })
    // )

    return this.languageService.valueOf({
      language,
      token: VERIFICATION_CODE_SMS,
      locals: {
        verificationCode: session.verificationCode
      }
    })

    // return !!session.personId

  }

  @Query(() => Boolean, { nullable: true })
  isConfirmPerson(@Session() { personId, verificationCode }: ISession) {
    return personId && !verificationCode
  }

  @Mutation(() => Boolean, { nullable: true })
  confirmPerson(@Args() { verificationCode }: ConfirmPersonArgs, @Session() session: ISession) {
Logger.log(session)
    const isConfirm = this.isConfirmPerson(session) || session.verificationCode === verificationCode

    if (isConfirm) delete session.verificationCode

    return isConfirm

  }

}