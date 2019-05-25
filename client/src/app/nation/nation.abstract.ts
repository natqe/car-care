export enum ENation {
  flag = 'flag',
  name = 'name',
  nativeName = 'nativeName'
}

export abstract class Nation {
  readonly [ENation.flag]: string
  readonly [ENation.name]: string
  readonly [ENation.nativeName]: string
}