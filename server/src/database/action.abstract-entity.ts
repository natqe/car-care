import { Column } from 'typeorm'
import { WithPriceEntity } from './with-price.abstract-entity'

export abstract class ActionEntity extends WithPriceEntity{

  @Column()
  actionDate: Date

}