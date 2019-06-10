import { CallingCode } from '../calling-code/calling-code.model'
import { Country } from '../country/country.model'
import { Main } from '../main/main.model'
import { Nation } from '../nation/nation.abstract'
import { Vehicle } from '../vehicle/vehicle.model'

export class Person extends Main {
  readonly phone?: number
  readonly callingCode?: CallingCode['value']
  readonly vehicles?: Array<Vehicle>
  readonly fullName?: string
  readonly language: Country['languages'][0]['iso639_1']
}

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode',
  vehicles = 'vehicles',
  fullName = 'fullName',
  language = 'language'
}