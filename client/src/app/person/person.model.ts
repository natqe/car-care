import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'
import { Main } from '../main/main.model'

export class Person extends Main {

  readonly phone: number

  readonly callingCode: CallingCode[ECallingCode.value]

  readonly vehicles?: Array<any>

}

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode',
  vehicles = 'vehicles'
}