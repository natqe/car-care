import isEqual from 'lodash/isEqual'
import maxBy from 'lodash/maxBy'
import uniq from 'lodash/uniq'
import uniqWith from 'lodash/uniqWith'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { Country } from './country.model'

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

      let value:Array<Country> = await storage.get(keyStorage)

      if (!value) {

        value = await httpClient.get(`https://restcountries.eu/rest/v2/all?fields=callingCodes;population;timezones;currencies;languages;`).toPromise() as Array<Country>

        value.sort((a, b)=> b.population - a.population)

        storage.set(keyStorage, value)

      }

      observer.next(value)

      observer.complete()

    })

  })

  readonly languages = this.all.pipe(map(value => uniqWith(value.flatMap(({ languages }) => languages.filter(Boolean)), isEqual)))

  readonly callingCodes = this.all.pipe(map(value => uniq(value.flatMap(({ callingCodes }) => callingCodes.map(callingCode => callingCode.replace(/\s+/g, ``)).filter(Boolean))).sort((a, b)=> +a - +b)))

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
