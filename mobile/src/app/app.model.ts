export abstract class App{
  readonly _id: string
  readonly _createDate: string
  readonly _updateDate: string
  readonly _version: number
  readonly _type = this.constructor.name
}

export enum EAppKey{
  _id = '_id',
  _createDate = '_createDate',
  _updateDate = '_updateDate',
  _version = '_version',
  _type = '_type',
}