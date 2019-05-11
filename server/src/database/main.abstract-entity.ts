import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm'

export abstract class MainEntity extends BaseEntity {

  readonly _type = this.constructor.name.toUpperCase().replace(`ENTITY`, ``)

  @PrimaryGeneratedColumn('uuid')
  _id: string

  @CreateDateColumn()
  _createDate: Date

  @UpdateDateColumn()
  _updateDate: Date

  @VersionColumn()
  _version: number

}