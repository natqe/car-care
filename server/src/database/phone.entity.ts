import { Column, Entity } from 'typeorm'
import { MainEntity } from './main.abstract-entity'

@Entity()
export class PhoneEntity extends MainEntity {

  @Column({ unique: true })
  value: string

  @Column()
  verificationCode: string

}