import { Subject } from 'rxjs'
import { first } from 'rxjs/operators'
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CareModalComponent } from '../care-modal/care-modal.component'
import { Care } from '../care/care.model'
import { FuelModalComponent } from '../fuel-modal/fuel-modal.component'
import { Fuel } from '../fuel/fuel.model'
import { LogService } from '../log/log.service'
import { PersonService } from '../person/person.service'
import { TestModalComponent } from '../test-modal/test-modal.component'
import { Test } from '../test/test.model'
import { Vehicle } from '../vehicle/vehicle.model'
import { WashModalComponent } from '../wash-modal/wash-modal.component'
import { Wash } from '../wash/wash.modal'

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage implements OnDestroy {

  vehicles: Array<Vehicle>

  constructor(
    readonly personService: PersonService,
    private readonly logService: LogService,
    private readonly modalController: ModalController) {
    logService.debugInstance(this)
  }

  private readonly componentLeave = new Subject

  readonly vehicle = new Vehicle

  async openUpdateModal(value) {

    let component: Function

    if (value instanceof Fuel) component = FuelModalComponent
    else if (value instanceof Care) component = CareModalComponent
    else if (value instanceof Wash) component = WashModalComponent
    else if (value instanceof Test) component = TestModalComponent

    const modal = await this.modalController.create({ component })

    modal.present()

  }

  ionViewWillEnter() {
    this.personService.vehicles().pipe(first()).subscribe(vehicles => this.vehicles = vehicles)
  }

  ionViewWillLeave() {
    this.componentLeave.next()
  }

  ngOnDestroy() {
    this.componentLeave.complete()
  }

}
