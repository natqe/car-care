import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ActionResolver } from '../action/action.resolver'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { CreateWashArgs } from './wash.dto'
import { Wash } from './wash.model'

@Resolver(() => Wash)
export class WashResolver extends ActionResolver {
  @Mutation(() => Wash)
  createWash(@Args() args: CreateWashArgs, @Session() { personId }: ISession) {
    return this.create(Wash, personId, args)
  }
}