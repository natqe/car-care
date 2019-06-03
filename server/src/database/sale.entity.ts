import { Entity, OneToOne } from 'typeorm'
import { Vehicle } from '../vehicle/vehicle.model'
import { WithPriceEntity } from './with-price.abstract-entity'

@Entity()
export class SaleEntity extends WithPriceEntity {
  @OneToOne(() => Vehicle)
  vehicle: Vehicle
}