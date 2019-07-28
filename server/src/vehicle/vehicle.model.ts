import { createUnionType, Field, Int, ObjectType, ID } from 'type-graphql'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Care } from '../care/care.model'
import { Fuel } from '../fuel/fuel.model'
import { Person } from '../person/person.model'
import { Sale } from '../sale/sale.model'
import { Test } from '../test/test.model'
import { Wash as Wash } from '../wash/wash.model'
import { WithImage } from '../with-image/with-image.abstract'

@ObjectType()
@Entity()
export class Vehicle extends WithImage {

  @Field(() => Sale, { nullable: true })
  @OneToOne(() => Sale, { eager: true, cascade: true })
  @JoinColumn()
  readonly sale?: Sale

  @Field(() => [Fuel])
  @OneToMany(() => Fuel, ({ vehicle }) => vehicle, { eager: true })
  readonly fuels: Array<Fuel>

  @Field(() => [Wash])
  @OneToMany(() => Wash, ({ vehicle }) => vehicle, { eager: true })
  readonly washes: Array<Wash>

  @Field(() => [Care])
  @OneToMany(() => Care, ({ vehicle }) => vehicle, { eager: true })
  readonly cares: Array<Care>

  @Field(() => [Test])
  @OneToMany(() => Test, ({ vehicle }) => vehicle, { eager: true })
  readonly tests: Array<Test>

  @Field(() => [String])
  @Column(`text`, { array: true })
  readonly gallery: Array<this['image']>

  @Field(() => ID)
  @Column(`text`)
  readonly person: Person['_id']

  @Field()
  @Column()
  readonly license: string

  @Field()
  @Column()
  readonly type: string

  @Field(() => Int)
  @Column()
  readonly hand: number

  @Field(() => Int)
  @Column()
  readonly km: number

  @Field()
  @Column()
  readonly color: string

  @Field()
  @Column()
  readonly productionDate: string

  @Field()
  @Column()
  readonly producer: string

  @Field()
  @Column()
  readonly model: string

  @Field()
  @Column({ default: true })
  readonly isActive: boolean

  @Field({ nullable: false })
  @Column({ nullable: false })
  readonly image: string

}

export enum EVehicle {
  sale = 'sale',
  fuels = 'fuels',
  tests = 'tests',
  washes = 'washes',
  cares = 'cares',
  model = 'model',
  isActive = 'isActive',
  producer = 'producer',
  gallery = 'gallery',
  person = 'person',
  license = 'license',
  type = 'type',
  hand = 'hand',
  productionDate = 'productionDate',
  color = 'color',
  km = 'km'
}