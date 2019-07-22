import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import isEqual from 'lodash/isEqual'
import { Observable } from 'rxjs'
import { filter, first, pluck, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { PersonDataService } from '../person/person-data.service'
import { ELanguage, EN } from './language.enum'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    readonly translateService: TranslateService,
    private readonly personDataService: PersonDataService,
    // private readonly personService: PersonService,
    private readonly apollo: Apollo) {

    const { documentElement: { lang } } = document

    if (lang !== EN) translateService.addLangs([lang])

    translateService.setDefaultLang(EN)

    translateService.use(lang)

  }

  private readonly store: { [key: string]: { value: string, locals } } = {}

  private readonly storageKey = `language`

  set current(value) {

    const { current, personDataService } = this

    if (value !== current) personDataService.editPerson({ language: value }).
      pipe(
        filter(Boolean),
        tap(() => this.setLangInStorage(value))
      ).
      subscribe()

  }

  get current() {
    return <ELanguage>localStorage.getItem(this.storageKey) || <ELanguage>document.documentElement.lang
  }

  init() {

    const { storageKey, apollo, personDataService } = this

    apollo.
      query<{ languageOfPerson: ELanguage }>({
        query: gql`
          {
            languageOfPerson
          }
        `,
        fetchPolicy: `no-cache`
      }).
      pipe(
        pluck(`data`, `languageOfPerson`),
        filter(value => !!value),
        tap(language => personDataService.patch({ language })),
        filter(lang => lang !== localStorage.getItem(storageKey)),
        tap(lang => this.setLangInStorage(lang)),
      ).
      subscribe()

  }

  setLangInStorage(value: ELanguage) {

    localStorage.setItem(this.storageKey, value)

    location.reload()

  }

  valueOf(key: string, locals?: { [key: string]: any }) {
    return <Observable<string>>this.translateService.get(key, locals)
  }

  valueOfAsync(key: string, locals?: { [key: string]: any }) {
    return this.valueOf(key, locals).pipe(first()).toPromise()
  }

  currentValueOf(key: string, locals?: { [key: string]: any }) {

    const { store, translateService } = this

    if (!store[key] || store[key].value === key || !isEqual(store[key].locals, locals)) {
      store[key] = {
        value: translateService.instant(key, locals),
        locals
      }
    }

    return store[key].value

  }

}
