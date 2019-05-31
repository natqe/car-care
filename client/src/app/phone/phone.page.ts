import { of, Subject } from 'rxjs'
import { filter, first, switchMap, takeUntil } from 'rxjs/operators'
import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController, NavController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'
import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'
import { CallingCodesModalComponent } from '../calling-codes-modal/calling-codes-modal.component'
import { CountryService } from '../country/country.service'
import { LogService } from '../log/log.service'
import { ENation } from '../nation/nation.abstract'
import { PersonService } from '../person/person.service'
import { UtilService } from '../util/util.service'

const
  PHONE = `phone`,
  PREFIX = `prefix`

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['./phone.page.scss']
})
export class PhonePage extends FormGroup  implements OnDestroy {

  constructor(
    readonly countryService: CountryService,
    private readonly personService: PersonService,
    private readonly navController: NavController,
    private readonly utilService: UtilService,
    private readonly logService: LogService,
    private readonly modalController: ModalController) {

    super({
      [PHONE]: new FormControl(null, [Validators.required, Validators.pattern(/^\d{9}$/)]),
      [PREFIX]: new FormControl(null)
    })

    logService.debugInstance(this)

    const { controls } = this

    countryService.default.
      pipe(
        filter(value => !!value),
        switchMap(country => country.callingCodes[0] ? of(country) : countryService.biggest),
        first(),
      ).
      subscribe(({ callingCodes: [value], name, nativeName, flag }) => controls[PREFIX].setValue(<CallingCode>{ value, nativeName, name, flag }))

  }

  private readonly componentLeave = new Subject

  readonly controlsNames = { PHONE, PREFIX }

  readonly ENation = ENation

  readonly ECallingCode = ECallingCode

  async openCallingCodesModal() {

    const { modalController, controls } = this

    const modal = await modalController.create({
      component: CallingCodesModalComponent,
      componentProps: {
        selected: controls[PREFIX].value
      }
    })

    modal.present()

    const { data }: OverlayEventDetail<CallingCode> = await modal.onWillDismiss()

    if (data) controls[PREFIX].setValue(data)

  }

  handleSubmit() {

    const
      { controls, personService, navController, utilService, valid } = this,
      phone = controls[PHONE].value

    if (valid) {

      const asyncOperation = utilService.createAsyncOperation()

      asyncOperation.next(true)

      personService.create({ phone, callingCode: controls[PREFIX].value[ECallingCode.value] }).subscribe(created => {

        asyncOperation.complete()

        if (created) navController.navigateForward(`/auth/verification-code`)

      })

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