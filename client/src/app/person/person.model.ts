import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'

export enum EPerson {
  phone = 'phone',
  callingCode = 'callingCode'
}

export class Person {
  readonly [EPerson.phone]: number
  readonly [EPerson.callingCode]: CallingCode[ECallingCode.value]
}