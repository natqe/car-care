import { Action } from '../action/action.model'
import { Vehicle } from '../vehicle/vehicle.model'

export enum ECareType {
  period = 'period',
  tire = 'tire',
  mishap = 'mishap',
  other = 'other'
}

export class Care extends Action {
  readonly type: ECareType
  readonly description?: string
  readonly km?: number
}

export enum ECare {
  type = 'type',
  description = 'description',
  km = 'km'
}