import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { EMain } from '../main.abstract'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { Vehicle } from '../vehicle/vehicle.model'
import { CreateCareArgs } from './care.dto'
import { Care } from './care.model'

@Resolver(() => Care)
export class CareResolver {
  @Mutation(() => Boolean)
  async createCare(@Args() args: CreateCareArgs, @Session() { personId }: ISession) {

    await Vehicle.findOneOrFail({ _id: args.vehicle, person: personId }, { select: [EMain._id] })

    await Care.create(args).save()

    return true

  }
}
