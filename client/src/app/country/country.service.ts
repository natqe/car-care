import isEqual from 'lodash/isEqual'
import maxBy from 'lodash/maxBy'
import remove from 'lodash/remove'
import uniqWith from 'lodash/uniqWith'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'
import { ENation } from '../nation/nation.abstract'
import { Country, ECounty } from './country.model'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly platform: Platform,
    private readonly storage: Storage) { }

  private readonly keyStorage = `country`

  readonly all = new Observable<Array<Country>>((observer) => {

    const { httpClient, storage, keyStorage, platform } = this

    platform.ready().then(async () => {

      let value: Array<Country> = await storage.get(keyStorage)

      if (!value) {

        value = await httpClient.get<typeof value>(`https://restcountries.eu/rest/v2/all?fields=name;nativeName;callingCodes;population;currencies;languages;flag`).toPromise()

        for (const { callingCodes } of value) {

          for (let index = 0;index < callingCodes.length;++index) callingCodes[index] = +(callingCodes[index] as any).replace(/\s+/g, ``)

          remove(callingCodes, callingCode => !callingCode)

        }

        remove(value, ({ callingCodes, population }) => !callingCodes.length || !population)

        value.sort((a, b) => b.population - a.population)

        storage.set(keyStorage, value)

      }

      observer.next(value)

      observer.complete()

    })

  })

  readonly languages = this.all.pipe(map(value => uniqWith(value.flatMap(({ languages }) => languages.filter(Boolean)), isEqual)))

  readonly callingCodes = this.all
    .pipe(map(
      countries => countries.flatMap((country) => country[ECounty.callingCodes].map(value => (<CallingCode>{
        [ECallingCode.value]: value,
        [ENation.flag]: country[ENation.flag],
        [ENation.nativeName]: country[ENation.nativeName],
        [ENation.name]: country[ENation.name]
      })))
    ))

  readonly default = this.all.pipe(
    map(value => {

      const
        { documentElement: { lang } } = document,
        matchesCountries = value.filter(({ languages }) => languages.some(({ iso639_1 }) => iso639_1 === lang)),
        matchesCountriesFirstLanguage = matchesCountries.filter(({ languages: [{ iso639_1 }] }) => iso639_1 === lang)

      return this.maxByPopulation(matchesCountriesFirstLanguage.length ? matchesCountriesFirstLanguage : matchesCountries)

    })
  )

  readonly biggest = this.all.pipe(map(value => this.maxByPopulation(value)))

  private maxByPopulation(test: Array<Country>) {
    return maxBy(test, `population`)
  }

  async Init() {

  }

}
