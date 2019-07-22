import { Subject } from 'rxjs'
import { filter, first, map, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController, NavController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'
import { AppService } from '../app.service'
import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'
import { CallingCodesModalComponent } from '../calling-codes-modal/calling-codes-modal.component'
import { CountryService } from '../country/country.service'
import { FormControls, IFormControl } from '../form/form.model'
import { LanguageService } from '../language/language.service'
import { LogService } from '../log/log.service'
import { ENation } from '../nation/nation.abstract'
import { PersonDataService } from '../person/person-data.service'

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss']
})
export class PhonePage extends FormGroup implements OnDestroy {

  readonly value: {
    phone: number,
    prefix: CallingCode
  }

  readonly controls: FormControls<this> & {
    prefix: IFormControl<PhonePage, 'prefix'>
  }

  constructor(
    readonly countryService: CountryService,
    private readonly personDataService: PersonDataService,
    private readonly languageService: LanguageService,
    private readonly navController: NavController,
    private readonly appService: AppService,
    logService: LogService,
    private readonly modalController: ModalController) {

    super(<this['controls']>{
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^\d{9}$/)]),
      prefix: new FormControl(null)
    })

    logService.debugInstance(this)

    const { controls } = this

    countryService.default.
      pipe(
        first(),
        tap(({ callingCodes: [value], name, nativeName, flag }) => controls.prefix.setValue({ value, nativeName, name, flag }, { emitEvent: false }))
      ).
      subscribe()

  }

  private readonly componentLeave = new Subject

  readonly ENation = ENation

  readonly ECallingCode = ECallingCode

  async openCallingCodesModal() {

    const { modalController, controls, value } = this

    const modal = await modalController.create({
      component: CallingCodesModalComponent,
      componentProps: {
        selected: value.prefix
      }
    })

    modal.present()

    const { data }: OverlayEventDetail<CallingCode> = await modal.onWillDismiss()

    if (data) controls.prefix.setValue(data)

  }

  handleSubmit() {

    const
      { personDataService, navController, appService, valid, languageService, value, countryService } = this,
      phone = value.phone,
      asyncOperation = appService.createAsyncOperation()

    if (valid) {

      asyncOperation.next(true)

      countryService.default.
        pipe(
          first(),
          map(({ currencies: [{ code }] }) => code),
          switchMap(currency => personDataService.createPerson({ phone, callingCode: value.prefix[ECallingCode.value], language: languageService.current, currency })),
          tap(() => asyncOperation.complete()),
          filter(value => value),
          tap(() => navController.navigateForward(`/auth/verification-code`))
        ).
        subscribe()

    }

  }

  ionViewWillEnter() {

    const { statusChanges, componentLeave } = this

    statusChanges.pipe(filter(status => status === 'VALID'), takeUntil(componentLeave)).subscribe(() => this.handleSubmit())

  }

  ionViewWillLeave() {
    this.componentLeave.next()
  }

  ngOnDestroy() {
    this.componentLeave.complete()
  }

}