import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { Main } from '../main.abstract'
import { Vehicle } from '../vehicle/vehicle.model'
import { ActionEntity } from './action.abstract-entity'

@Entity()
export class TestEntity extends ActionEntity{

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle

  @Column({ nullable: true })
  actionDate: Date

  @Column({ nullable: true })
  price: number

  @Column({ nullable: true })
  currency: string

  @Column()
  expirationDate: Date

}