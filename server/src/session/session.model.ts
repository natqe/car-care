import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Session {

  @PrimaryColumn()
  readonly sid: string

  @Column(`json`)
  readonly sess: object

  @Column(`timestamp`)
  readonly expire: Date

}