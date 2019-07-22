export abstract class Main {
  readonly _id?: string
  readonly _createDate?: string
  readonly _updateDate?: string
  readonly _version?: string
  readonly _type?: string
}

export enum EMain {
  _id = '_id',
  _createDate = '_createDate',
  _updateDate = '_updateDate',
  _version = '_version',
  _type = '_type'
}