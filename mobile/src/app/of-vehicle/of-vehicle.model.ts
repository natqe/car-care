import { Main } from '../main/main.model'
import { Vehicle } from '../vehicle/vehicle.model'

export class OfVehicle extends Main {
  readonly vehicle: Vehicle | Vehicle['_id']
}

export enum EOfVehicle {
  vehicle = 'vehicle'
}