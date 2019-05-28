import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'

export class Person {
  readonly phone: number
  readonly callingCode: CallingCode[ECallingCode.value]
}

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode'
}