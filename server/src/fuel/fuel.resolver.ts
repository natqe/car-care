import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { ActionResolver } from '../action/action.resolver'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { CreateFuelArgs } from './fuel.dto'
import { Fuel } from './fuel.model'

@Resolver(() => Fuel)
export class FuelResolver extends ActionResolver {
  @Mutation(() => Fuel)
  createFuel(@Args() args: CreateFuelArgs, @Session() { personId }: ISession) {
    return this.create(Fuel, personId, args)
  }
}