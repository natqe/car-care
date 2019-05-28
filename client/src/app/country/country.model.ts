import { Nation } from '../nation/nation.abstract'

export class Country extends Nation {
  readonly currencies: Array<{
    code: string
    name: string
    symbol: string
  }>
 readonly languages: Array<{
    iso639_1: string
    iso639_2: string
    name: string
    nativeName: string
  }>
  readonly callingCodes?: Array<number>
  readonly population?: number
}

export enum ECounty {
  currencies = 'currencies',
  languages = 'languages',
  callingCodes = 'callingCodes',
  population = 'population'
}