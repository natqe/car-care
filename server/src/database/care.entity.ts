import { Column, Entity, ManyToOne } from 'typeorm'
import { Vehicle } from '../vehicle/vehicle.model'
import { ActionEntity } from './action.abstract-entity'

@Entity()
export class CareEntity extends ActionEntity {

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle

  @Column()
  type: string

  @Column()
  description: string

  @Column()
  km: number

}