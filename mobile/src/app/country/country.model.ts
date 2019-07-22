import { Currency } from '../currency/currency.model'
import { Nation } from '../nation/nation.abstract'

export class Country extends Nation {
  readonly currencies: Array<Currency>
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