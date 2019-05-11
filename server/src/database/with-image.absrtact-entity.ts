import { Column } from 'typeorm'
import { MainEntity } from './main.abstract-entity'

export abstract class WithImageEntity extends MainEntity{
  @Column()
  image: string
}