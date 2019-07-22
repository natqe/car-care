import { Subject } from 'rxjs'
import { filter, takeUntil, tap } from 'rxjs/operators'
import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Currency } from '../currency/currency.model'
import { CurrencyService } from '../currency/currency.service'
import { FormControls, IFormControl } from '../form/form.model'
import { FullNameService } from '../full-name/full-name.service'
import { ELanguage } from '../language/language.enum'
import { LanguageService } from '../language/language.service'

@Component({
  selector: 'app-person',
  templateUrl: 'person.page.html',
  styleUrls: ['person.page.scss']
})
export class PersonPage extends FormGroup implements OnDestroy {

  readonly value: {
    currency: Currency
    fullName: string
    language: ELanguage
  }

  readonly controls: FormControls<this> & {
    currency: IFormControl<PersonPage, 'currency'>
  }

  private readonly componentEnd = new Subject

  readonly ELanguage = ELanguage

  constructor(
    private readonly fullNameService: FullNameService,
    readonly currencyService: CurrencyService,
    private readonly languageService: LanguageService) {

    super(<this['controls']>{
      currency: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null, [Validators.required, Validators.pattern(fullNameService.pattern)]),
      language: new FormControl(languageService.current, [Validators.required])
    })

    currencyService.getValue().
      pipe(tap(value => this.controls.currency.setValue(value, { emitEvent: false }))).
      subscribe()

  }

  ionViewWillEnter() {

    const { controls: { currency, fullName, language }, componentEnd, fullNameService, currencyService, languageService } = this

    fullName.valueChanges.
      pipe(
        takeUntil(componentEnd),
        filter(() => this.valid),
        tap(result => fullNameService.setValue(result))
      ).
      subscribe()

    currency.valueChanges.
      pipe(
        takeUntil(componentEnd),
        filter(() => this.valid),
        tap(result => currencyService.setValue(result))
      ).
      subscribe()

    language.valueChanges.
      pipe(
        takeUntil(componentEnd),
        filter(() => this.valid),
        tap(result => languageService.current = result)
      ).
      subscribe()

  }

  ionViewWillLeave() {
    this.componentEnd.next()
  }

  ngOnDestroy() {
    this.componentEnd.complete()
  }

}