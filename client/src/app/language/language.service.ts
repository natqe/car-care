import isEqual from 'lodash/isEqual'
import moment from 'moment'
import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage'
import { TranslateService } from '@ngx-translate/core'
import { ELanguage, EN } from './language.enum'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    readonly translateService: TranslateService,
    private readonly storage: Storage) {

    const { documentElement: { lang } } = document

    if (lang !== EN) translateService.addLangs([lang])

    translateService.setDefaultLang(EN)

    translateService.use(lang)

  }

  private readonly store: { [key: string]: { value: string, locals } } = {}

  private readonly storageKey = `language`

  readonly moment = moment

  set current(value) {

    const { storageKey, storage, current } = this

    if (value !== current) {

      localStorage.setItem(storageKey, value)

      storage.set(storageKey, value).then(() => location.reload())

    }

  }

  get current() {
    return <ELanguage>localStorage.getItem(this.storageKey) || <ELanguage>document.documentElement.lang
  }

  async init() {

    const
      { storage, storageKey } = this,
      fromLocalStorage = <ELanguage>localStorage.getItem(storageKey),
      fromStorage = <ELanguage>await storage.get(storageKey)

    if (!fromStorage) {

      const { documentElement: { lang } } = document

      localStorage.setItem(storageKey, lang)

      storage.set(storageKey, lang)

    }
    else if (fromStorage !== fromLocalStorage) {

      localStorage.setItem(storageKey, fromStorage)

      location.reload()

    }

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
