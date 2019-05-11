import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { Keyboard } from '@ionic-native/keyboard/ngx'
import { LoadingController, ModalController, Platform } from '@ionic/angular'

const controlsNames = {
  CURRENCY: 'currency',
  DATE: 'date',
  PRICE: 'price'
}


@Component({
  selector: 'app-fuel-modal',
  templateUrl: './fuel-modal.component.html',
  styleUrls: ['./fuel-modal.component.scss'],
})
export class FuelModalComponent extends FormGroup {

  constructor(
    readonly platform: Platform,
    readonly keyboard: Keyboard,
    readonly modalController: ModalController,
    private readonly loadingController: LoadingController) {
    super({
      [controlsNames.DATE]: new FormControl(new Date().toISOString(), Validators.required),
      [controlsNames.CURRENCY]: new FormControl(`USE`, Validators.required),
      [controlsNames.PRICE]: new FormControl(null, Validators.required)
    })
  }

  readonly controlsNames = controlsNames

  async save() {

    const { modalController, value, loadingController } = this

    console.log(value)

    const loading = await loadingController.create()

    await loading.present()

    setTimeout(async () => {

      await loading.dismiss()

      modalController.dismiss()

    }, 1000)

  }

}
