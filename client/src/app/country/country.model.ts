export class Country {
  currencies: Array<{
    code: string
    name: string
    symbol: string
  }>
  languages: Array<{
    iso639_1: string
    iso639_2: string
    name: string
    nativeName: string
  }>
  callingCodes?: Array<string>
  population?: number
  timezones?: Array<string>
}