import { MainEntity } from './main.abstract-entity'
import { VehicleEntity } from './vehicle.entity'

export abstract class OfVehicleEntity extends MainEntity{

  vehicle: VehicleEntity

}