import { Column, Entity, ManyToOne } from 'typeorm'
import { Vehicle } from '../vehicle/vehicle.entity'
import { ActionEntity } from './action.abstract-entity'

@Entity()
export class WashEntity extends ActionEntity {

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle

}