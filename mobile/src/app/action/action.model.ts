import { WithPrice } from '../with-price/with-price.model'

export class Action extends WithPrice {
  readonly actionDate: string
}

export enum EAction {
  actionDate = 'actionDate'
}