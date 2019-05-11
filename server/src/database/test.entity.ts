import { Column, Entity, ManyToOne, OneToOne } from 'typeorm'
import { ActionEntity } from './action.abstract-entity'
import { MainEntity } from './main.abstract-entity'
import { VehicleEntity } from './vehicle.entity'

@Entity()
export class TestEntity extends ActionEntity{

  @ManyToOne(() => VehicleEntity)
  vehicle: VehicleEntity

  @Column({ nullable: true })
  actionDate: Date

  @Column({ nullable: true })
  price: number

  @Column({ nullable: true })
  currency: string

  @Column()
  expirationDate: Date

}