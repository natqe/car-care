import { Entity, OneToOne } from 'typeorm'
import { VehicleEntity } from './vehicle.entity'
import { WithPriceEntity } from './with-price.abstract-entity'

@Entity()
export class SaleEntity extends WithPriceEntity {
  @OneToOne(() => VehicleEntity)
  vehicle: VehicleEntity
}