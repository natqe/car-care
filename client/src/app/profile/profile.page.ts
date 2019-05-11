import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { first } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { USD } from '../currency/currency.enum'
import { Currency } from '../currency/currency.model'
import { CurrencyService } from '../currency/currency.service'
import { Language } from '../language/language.model'
import { LanguageService } from '../language/language.service'

const
  CURRENCY = 'currency',
  FULL_NAME = 'fullName',
  LANGUAGE = `language`

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage extends FormGroup {

  private initialValue

  constructor(currencyService: CurrencyService,
    private readonly languageService: LanguageService) {

    super({
      [CURRENCY]: new FormControl(USD),
      [FULL_NAME]: new FormControl(null, [Validators.required, Validators.pattern(new RegExp("^[a-z\\u05D0-\\u05EA'´`]+\\.?\\s+([a-z\\uu05D0-\\u05EA'´`]+\\.?\\s*)+$", `i`))]),
      [LANGUAGE]: new FormControl(languageService.current)
    })

    currencyService.current.subscribe(value => this.controls[CURRENCY].setValue(value))

    this.setInitialValue()

  }

  readonly controlsNames = { CURRENCY, FULL_NAME, LANGUAGE }

  readonly currency = new Currency

  readonly language = new Language

  get valueChange() {

    const { value, initialValue } = this

    return !isEqual(value, initialValue)

  }

  setInitialValue() {
    this.initialValue = cloneDeep(this.value)
  }

  save() {

    const { value, languageService } = this

    languageService.current = value[LANGUAGE]

    this.setInitialValue()

  }

}