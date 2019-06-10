import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { USD } from '../currency/currency.enum'
import { CurrencyService } from '../currency/currency.service'
import { Language } from '../language/language.model'
import { LanguageService } from '../language/language.service'

const
  CURRENCY = 'currency',
  FULL_NAME = 'fullName',
  LANGUAGE = `language`

@Component({
  selector: 'app-person',
  templateUrl: 'person.page.html',
  styleUrls: ['person.page.scss']
})
export class PersonPage extends FormGroup {

  private initialValue

  constructor(
    readonly currencyService: CurrencyService,
    private readonly languageService: LanguageService) {

    super({
      [CURRENCY]: new FormControl(USD),
      [FULL_NAME]: new FormControl(null, [Validators.required, Validators.pattern(RegExp("^[a-z\\u05D0-\\u05EA'´`]+\\.?\\s+([a-z\\u05D0-\\u05EA'´`]+\\.?\\s*)+$", `i`))]),
      [LANGUAGE]: new FormControl(languageService.current)
    })

    currencyService.current.subscribe(value => this.controls[CURRENCY].setValue(value))

    this.setInitialValue()

  }

  readonly controlsNames = { CURRENCY, FULL_NAME, LANGUAGE }

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