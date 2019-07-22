import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ActionResolver } from '../action/action.resolver'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { CreateTestArgs } from './test.dto'
import { Test } from './test.model'

@Resolver(() => Test)
export class TestResolver extends ActionResolver {
  @Mutation(() => Test)
  createTest(@Args() args: CreateTestArgs, @Session() { personId }: ISession) {
    return this.create(Test, personId, args)
  }
}