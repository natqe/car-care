import { OfVehicle } from '../of-vehicle/of-vehicle.model'

export class WithPrice extends OfVehicle {
  readonly price: number
  readonly currency: string
}

export enum EWithPrice {
  price = 'price',
  currency = 'currency'
}