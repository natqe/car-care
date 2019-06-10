import { Subject } from 'rxjs'
import { first, switchMap, takeUntil } from 'rxjs/operators'
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
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
export class MainPage implements OnDestroy, OnInit {

  vehicles: Array<Vehicle>

  constructor(
    readonly personService: PersonService,
    private readonly logService: LogService,
    private readonly modalController: ModalController) {
    logService.debugInstance(this)
  }

  private readonly componentLeave = new Subject()

  private readonly componentEnd = new Subject

  readonly vehicle = {
    state: {
      care: new Care,
      wash: new Wash,
      fuel: new Fuel,
      test: new Test
    }
  }

  async openUpdateModal(value) {

    let component: Function

    if (value instanceof Fuel) component = FuelModalComponent
    else if (value instanceof Care) component = CareModalComponent
    else if (value instanceof Wash) component = WashModalComponent
    else if (value instanceof Test) component = TestModalComponent

    const modal = await this.modalController.create({ component })

    modal.present()

  }

  ngOnInit() {

    const { personService, componentEnd } = this

    personService.fetchVehicles().pipe(first()).subscribe(() => personService.value.pipe(takeUntil(componentEnd)).subscribe(({ vehicles }) => this.vehicles = vehicles))

  }

  ionViewWillEnter() {
  }

  ionViewWillLeave() {
    this.componentLeave.next()
  }

  ngOnDestroy() {

    const { componentEnd, componentLeave } = this

    componentEnd.next()

    componentEnd.complete()

    componentLeave.complete()

  }

}
