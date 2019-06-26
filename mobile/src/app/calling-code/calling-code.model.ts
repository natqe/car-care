import { Country } from '../country/country.model'
import { Nation } from '../nation/nation.abstract'

export class CallingCode extends Nation {
  readonly value: Country['callingCodes'][0]
}

export enum ECallingCode {
  value = 'value'
}