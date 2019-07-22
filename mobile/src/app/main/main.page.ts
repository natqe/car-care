import get from 'lodash/get'
import { BehaviorSubject, Subject } from 'rxjs'
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { AppService } from '../app.service'
import { CareModalComponent } from '../care-modal/care-modal.component'
import { FuelModalComponent } from '../fuel-modal/fuel-modal.component'
import { FullNameService } from '../full-name/full-name.service'
import { LogService } from '../log/log.service'
import { PersonVehiclesDataService } from '../person/person-vehicles-data.service'
import { TestModalComponent } from '../test-modal/test-modal.component'
import { Vehicle } from '../vehicle/vehicle.model'
import { WashModalComponent } from '../wash-modal/wash-modal.component'
import { EMain } from './main.model'

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss']
})
export class MainPage implements OnDestroy, OnInit {

  vehicles: Array<Vehicle>

  private readonly componentLeave = new Subject

  private readonly componentEnd = new Subject

  readonly selectedVehicle = new BehaviorSubject<Vehicle>(null)

  constructor(
    readonly personVehiclesDataService: PersonVehiclesDataService,
    readonly appService: AppService,
    readonly fullNameService: FullNameService,
    logService: LogService,
    private readonly modalController: ModalController) {
    logService.debugInstance(this)
  }

  async openUpdateModal({ type }: { type: 'care' | 'wash' | 'fuel' | 'test' }) {

    let component: Function

    if (type === 'fuel') component = FuelModalComponent
    else if (type === 'care') component = CareModalComponent
    else if (type === 'wash') component = WashModalComponent
    else if (type === 'test') component = TestModalComponent

    const modal = await this.modalController.create({
      component,
      componentProps: { vehicle: get(this.selectedVehicle.getValue(), EMain._id) }
    })

    modal.present()

  }

  ngOnInit() {
    const { personVehiclesDataService, componentEnd } = this
    personVehiclesDataService.
      value.
      pipe(
        filter(value => !!value),
        takeUntil(componentEnd),
        tap(value => this.vehicles = value),
        tap(() => this.selectedVehicle.next(this.vehicles[0]))
      ).
      subscribe()
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
