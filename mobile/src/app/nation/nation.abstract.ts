export abstract class Nation {
  readonly flag: string
  readonly name: string
  readonly nativeName: string
}

export enum ENation {
  flag = 'flag',
  name = 'name',
  nativeName = 'nativeName'
}