import { size } from 'lodash'
import { push } from 'utilizes/push'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { EMain } from '../main.abstract'
import { MainService } from '../main.service'
import { EPerson, Person } from '../person/person.model'
import { Session } from '../session/session.decorator'
import { ISession } from '../session/session.interface'
import { CreateVehicleArgs } from './vehicle.dto'
import { Vehicle } from './vehicle.model'

@Resolver(() => Vehicle)
export class VehicleResolver {

  constructor(private readonly mainService: MainService) { }

  @Mutation(() => Boolean)
  async createVehicle(@Args() args: CreateVehicleArgs, @Session() { personId }: ISession) {

    const person = await Person.findOneOrFail(personId, { select: [EMain._id, EPerson.vehicles] })

    let { image, gallery } = args

    const base64Images = [image]

    if (size(gallery)) base64Images.push(...gallery)

      ;[image, ...gallery] = await Promise.all(base64Images.map(data => this.mainService.saveImage(data)))

    const vehicle = await Vehicle.
      create({
        ...args, image, gallery,
        person: personId,
      }).
      save()

    push(person, EPerson.vehicles, vehicle._id)

    await Person.update(person._id, { vehicles: person.vehicles })

    return true

  }
}
