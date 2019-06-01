import { createUnionType, Field, ObjectType } from 'type-graphql'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { CareEntity as Care } from '../database/care.entity'
import { FuelEntity as Fuel } from '../database/fuel.entity'
import { SaleEntity as Sale } from '../database/sale.entity'
import { TestEntity as Test } from '../database/test.entity'
import { WashEntity as Wash } from '../database/wash.entity'
import { Person } from '../person/person.model'
import { WithImage } from '../with-image/with-image.abstract'

@ObjectType()
@Entity()
export class Vehicle extends WithImage {

  // @Field(()=> Sale)
  // @OneToOne(() => Sale, { nullable: true })
  // sale: Sale | Sale['_id']

  // @OneToMany(() => Fuel, ({ vehicle }) => vehicle)
  // fuels: Array<Fuel>

  // @OneToMany(() => Wash, ({ vehicle }) => vehicle)
  // washes: Array<Wash>

  // @OneToMany(() => Care, ({ vehicle }) => vehicle)
  // cares: Array<Care>

  // @OneToMany(() => Test, ({ vehicle }) => vehicle)
  // tests: Array<Test>

  @Field(() => [String])
  @Column(`text`, { array: true })
  gallery: Array<this['image']>

  @Field(() => String)
  @Column(`text`)
  user: Person['_id']

  @Field()
  @Column()
  license: string

  @Field()
  @Column()
  type: string

  @Field()
  @Column()
  hand: number

  @Field()
  @Column()
  km: number

  @Field()
  @Column()
  color: string

  @Field()
  @Column()
  productionDate: Date

  @Field()
  @Column()
  producer: string

  @Field()
  @Column()
  model: string

  @Field()
  @Column()
  isActive: boolean

}