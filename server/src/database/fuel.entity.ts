import { Column, Entity, ManyToOne } from 'typeorm'
import { ActionEntity } from './action.abstract-entity'
import { VehicleEntity } from './vehicle.entity'

@Entity()
export class FuelEntity extends ActionEntity{

  @ManyToOne(() => VehicleEntity)
  vehicle: VehicleEntity

}