import { Column, Entity, OneToOne } from 'typeorm'
import { PhoneEntity } from './phone.entity'
import { VehicleEntity } from './vehicle.entity'
import { WithImageEntity } from './with-image.absrtact-entity'

@Entity()
export class UserEntity extends WithImageEntity {

  @OneToOne(() => PhoneEntity, { nullable: false })
  phone: PhoneEntity

  @Column(`text`, { array: true })
  vehicles: Array<VehicleEntity['_id']> | Array<VehicleEntity>

  @Column()
  fullName: string

  @Column()
  language: string

  @Column()
  currency: string

}