import { Country, ECounty } from '../country/country.model'
import { Nation } from '../nation/nation.abstract'

export enum ECallingCode {
  value = 'value'
}

export class CallingCode extends Nation {
  readonly [ECallingCode.value]: Country[ECounty.callingCodes][0]
}