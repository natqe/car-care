import { Action } from '../action/action.model'

export class Test extends Action {
  readonly expirationDate: string
}

export enum ETest {
  expirationDate = 'expirationDate'
}