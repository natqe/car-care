import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Session {

@PrimaryColumn()
  sid: string

@Column(`json`)
  sess: object

@Column(`timestamp`)
  expire: Date

}