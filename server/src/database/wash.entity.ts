import { Column, Entity, ManyToOne } from 'typeorm'
import { Vehicle } from '../vehicle/vehicle.model'
import { ActionEntity } from './action.abstract-entity'

@Entity()
export class WashEntity extends ActionEntity {

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle

}