import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Person } from '../person/person.model'
import { WithImage } from '../with-image/with-image.abstract'
import { CareEntity } from './care.entity'
import { FuelEntity } from './fuel.entity'
import { SaleEntity } from './sale.entity'
import { TestEntity } from './test.entity'
import { WashEntity } from './wash.entity'

@Entity()
export class VehicleEntity extends WithImage {

  @OneToOne(() => SaleEntity, { nullable: true })
  sale: SaleEntity

  @OneToMany(() => FuelEntity, ({ vehicle }) => vehicle)
  fuels: Array<FuelEntity>

  @OneToMany(() => WashEntity, ({ vehicle }) => vehicle)
  washes: Array<WashEntity>

  @OneToMany(() => CareEntity, ({ vehicle }) => vehicle)
  cares: Array<CareEntity>

  @OneToMany(() => TestEntity, ({ vehicle }) => vehicle)
  tests: Array<TestEntity>

  @Column(`text`, { array: true })
  gallery: Array<string>

  @Column(`text`)
  user: Person['_id'] | Person

  @Column()
  license: string

  @Column()
  type: string

  @Column()
  hand: number

  @Column()
  km: number

  @Column()
  color: string

  @Column()
  productionDate: Date

  @Column()
  producer: string

  @Column()
  model: string

  @Column()
  isActive: boolean

}