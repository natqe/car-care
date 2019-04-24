import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { Observable } from 'rxjs'
import { first } from 'rxjs/operators'
import { prefix } from 'utilizes/prefix'
import { suffix } from 'utilizes/suffix'
import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { EN } from './language.enum'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(readonly translateService: TranslateService) {

    const { documentElement: { lang } } = document

    if (lang !== EN) translateService.addLangs([lang])

    translateService.setDefaultLang(EN)

    translateService.use(lang)

  }

  private readonly store: { [key: string]: { value: string, locals } } = {}

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
