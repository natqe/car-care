import { of } from 'rxjs'
import { filter, first, switchMap } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController, NavController } from '@ionic/angular'
import { OverlayEventDetail } from '@ionic/core'
import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'
import { CallingCodesModalComponent } from '../calling-codes-modal/calling-codes-modal.component'
import { CountryService } from '../country/country.service'
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
export class PhonePage extends FormGroup implements OnInit {

  constructor(
    readonly countryService: CountryService,
    private readonly personService: PersonService,
    private readonly navController: NavController,
    private readonly utilService: UtilService,
    private readonly modalController: ModalController) {

    super({
      [PHONE]: new FormControl(null, [Validators.required]),
      [PREFIX]: new FormControl(null)
    })

    countryService.default.pipe(
      filter(value => !!value),
      switchMap(country => country.callingCodes[0] ? of(country) : countryService.biggest),
      first(),
    ).subscribe(({ callingCodes: [value], name, nativeName, flag }) => this.controls[PREFIX].setValue(<CallingCode>{ value, nativeName, name, flag }))
    console.log(this)
  }

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
      { controls, personService, navController, utilService } = this,
      phone = controls[PHONE].value

    const asyncOperation = utilService.createAsyncOperation()

    asyncOperation.next(true)

    personService.create({ phone, callingCode: controls[PREFIX].value[ECallingCode.value] }).subscribe(created => {

      asyncOperation.complete()

      if (created) navController.navigateForward(`/auth/verification-code`)

    })

  }

  ngOnInit() { }

}