import { get, property, size } from 'lodash'
import { Twilio } from 'twilio'
import { numericCode } from 'utilizes/numeric-code'
import { Inject } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TWILIO_PROVIDER } from '../config/constants'
import { TWILIO_PHONE } from '../config/env'
import { VERIFICATION_CODE_SMS } from '../language/language.keys'
import { LanguageService } from '../language/language.service'
import { EMain } from '../main.abstract'
import { IdentityArgs } from '../main.dto'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { Vehicle } from '../vehicle/vehicle.model'
import { ConfirmPersonArgs, CreatePersonArgs, EditPersonArgs } from './person.dto'
import { EPerson, Person } from './person.model'

@Resolver(() => Person)
export class PersonResolver {

  constructor(
    @Inject(TWILIO_PROVIDER)
    private readonly twilio: Twilio,
    private readonly languageService: LanguageService) { }

  @Mutation(() => Boolean, { nullable: true })
  confirmPerson(@Args() { verificationCode }: ConfirmPersonArgs, @Session() session: ISession) {

    const isConfirm = this.isConfirmPerson(session) || session.verificationCode === verificationCode

    if (isConfirm) delete session.verificationCode

    return isConfirm

  }

  @Query(() => Boolean, { nullable: true })
  isConfirmPerson(@Session() { personId, verificationCode }: ISession) {
    return personId && !verificationCode
  }

  @Query(() => String, { nullable: true })
  async fullNameOfPerson(@Args() { _id }: IdentityArgs, @Session() { personId }: ISession) {

    if (!_id) _id = personId

    if (_id) return get(await Person.findOne(_id, { select: [EPerson.fullName] }), EPerson.fullName)

  }

  @Query(() => String, { nullable: true })
  async currencyOfPerson(@Args() { _id }: IdentityArgs, @Session() { personId }: ISession) {

    if (!_id) _id = personId

    if (_id) return get(await Person.findOne(_id, { select: [EPerson.currency] }), EPerson.currency)

  }


  @Query(() => String, { nullable: true })
  async languageOfPerson(@Args() { _id }: IdentityArgs, @Session() { personId }: ISession) {

    if (!_id) _id = personId

    if (_id) return get(await Person.findOne(_id, { select: [EPerson.language] }), EPerson.language)

  }

  @Mutation(() => Boolean)
  async createPerson(@Args() args: CreatePersonArgs, @Session() session: ISession) {

    const
      getId = property<Person, Person['_id']>(EMain._id),
      { callingCode, phone, language } = args,
      { twilio, languageService } = this

    if (!session.personId) session.personId = getId(await Person.findOne({ callingCode, phone }, { select: [EMain._id] })) || getId(await Person.create(args).save())

    session.verificationCode = numericCode()

    twilio.messages.create({
      to: `+${callingCode}${phone}`,
      from: `+${TWILIO_PHONE}`,
      body: await languageService.valueOf({
        language,
        token: VERIFICATION_CODE_SMS,
        locals: {
          verificationCode: session.verificationCode
        }
      }),
    })

    return !!session.personId

  }

  @Mutation(() => Boolean)
  async editPerson(@Args() { _id, ...args }: EditPersonArgs, @Session() { personId }: ISession) {
    return !!await Person.update(_id || personId, args)
  }

  @Query(() => [Vehicle], { nullable: true })
  async vehiclesOfPerson(@Args() { _id }: IdentityArgs, @Session() { personId }: ISession) {

    const vehicles = get(await Person.findOne(_id || personId, { select: [EPerson.vehicles] }), EPerson.vehicles)

    if (size(vehicles)) return Vehicle.findByIds(vehicles)

  }

}