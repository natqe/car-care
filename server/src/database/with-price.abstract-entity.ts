import { Column } from 'typeorm'
import { OfVehicleEntity } from './of-vehicle.abstract-entity'

export abstract class WithPriceEntity extends OfVehicleEntity{

  @Column()
  price: number

  @Column()
  currency: string

}