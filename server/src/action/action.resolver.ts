import { from } from 'rxjs'
import { mapTo, switchMap } from 'rxjs/operators'
import { EMain } from '../main.abstract'
import { Person } from '../person/person.model'
import { Vehicle } from '../vehicle/vehicle.model'
import { Action } from './action.abstract'

export abstract class ActionResolver {

  create(Entity: typeof Action, personId: Person['_id'], args: Partial<Action>) {
    return from(Vehicle.findOneOrFail({ _id: <string>args.vehicle, person: personId }, { select: [EMain._id] })).pipe(
      switchMap(() => Entity.create(args).save()),
    )
  }

}