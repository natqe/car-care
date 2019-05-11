import { Column, Entity, ManyToOne } from 'typeorm'
import { ActionEntity } from './action.abstract-entity'
import { VehicleEntity } from './vehicle.entity'

@Entity()
export class CareEntity extends ActionEntity {

  @ManyToOne(() => VehicleEntity)
  vehicle: VehicleEntity

  @Column()
  type: string

  @Column()
  description: string

  @Column()
  km: number

}