import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { CareEntity } from './care.entity'
import { FuelEntity } from './fuel.entity'
import { SaleEntity } from './sale.entity'
import { TestEntity } from './test.entity'
import { UserEntity } from './user.entity'
import { WashEntity } from './wash.entity'
import { WithImageEntity } from './with-image.absrtact-entity'

@Entity()
export class VehicleEntity extends WithImageEntity {

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
  user: UserEntity['_id'] | UserEntity

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