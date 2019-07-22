import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ActionResolver } from '../action/action.resolver'
import { EMain } from '../main.abstract'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { Vehicle } from '../vehicle/vehicle.model'
import { CreateCareArgs } from './care.dto'
import { Care } from './care.model'

@Resolver(() => Care)
export class CareResolver extends ActionResolver {
  @Mutation(() => Care)
  async createCare(@Args() args: CreateCareArgs, @Session() { personId }: ISession) {
    return this.create(Care, personId, args)
  }
}
