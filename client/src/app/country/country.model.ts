import { Nation } from '../nation/nation.abstract'

export enum ECounty {
  currencies = 'currencies',
  languages = 'languages',
  callingCodes = 'callingCodes',
  population = 'population'
}

export class Country extends Nation {
  readonly [ECounty.currencies]: Array<{
    code: string
    name: string
    symbol: string
  }>
 readonly [ECounty.languages]: Array<{
    iso639_1: string
    iso639_2: string
    name: string
    nativeName: string
  }>
  readonly [ECounty.callingCodes]?: Array<number>
  readonly [ECounty.population]?: number
}