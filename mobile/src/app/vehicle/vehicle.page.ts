import { from, Observable, Subject } from 'rxjs'
import { delay, filter, map, pluck, takeUntil, tap } from 'rxjs/operators'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PopoverController } from '@ionic/angular'
import { AppService } from '../app.service'
import { LogService } from '../log/log.service'
import { PersonVehiclesDataService } from '../person/person-vehicles-data.service'
import { VehicleMoreOptionsModalComponent } from '../vehicle-more-options-modal/vehicle-more-options-modal.component'
import { EVehicle, Vehicle } from './vehicle.model'
import moment from 'moment'
import { Test, ETest } from '../test/test.model'
import { Care } from '../care/care.model'
import { EAction } from '../action/action.model'
import { Fuel } from '../fuel/fuel.model'

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit, OnDestroy {

  data: Observable<Vehicle>

  loading: PersonVehiclesDataService['loading']

  gallery: Observable<Vehicle['gallery']>

  image: Observable<Vehicle['image']>

  license: Observable<Vehicle['license']>

  model: Observable<Vehicle['model']>

  type: Observable<Vehicle['type']>

  color: Observable<Vehicle['color']>

  hand: Observable<Vehicle['hand']>

  cares: Observable<Care['actionDate']>

  fuels:Observable<Fuel['actionDate']>

  km: Observable<Vehicle['km']>

  productionDate: Observable<Vehicle['productionDate']>

  productionYear: Observable<ReturnType<Date['getFullYear']>>

  productionMonth: Observable<ReturnType<Date['getMonth']>>

  productionDiffMonths: Observable<number>

  productionDiffYears: Observable<number>

  testExpirationDate: Observable<Test['expirationDate']>

  testExpirationDateYear: Observable<ReturnType<Date['getFullYear']>>

  testExpirationDateMonth: Observable<ReturnType<Date['getMonth']>>

  lastCareDate: Observable<ReturnType<Date['getDate']>>

  careGetYear: Observable<ReturnType<Date['getFullYear']>>

  careGetMonth: Observable<ReturnType<Date['getMonth']>>

  private readonly componentLeave = new Subject

  private readonly componentEnd = new Subject

  readonly id = this.activatedRoute.snapshot.paramMap.get(`id`)

  constructor(
    readonly appService: AppService,
    readonly logService: LogService,
    private readonly popoverController: PopoverController,
    private readonly personVehiclesDataService: PersonVehiclesDataService,
    private readonly activatedRoute: ActivatedRoute) {
    logService.debugInstance(this)
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const
      { id, personVehiclesDataService, componentLeave } = this,
      data = this.data = personVehiclesDataService.value.pipe(
        takeUntil(componentLeave),
        filter(value => !!value),
        map(items => items.find(({ _id }) => _id === id))
      )
    this.gallery = data.pipe(
      filter(value => !!value),
      map(({ gallery, image }) => gallery.length ? gallery : [image])
    )
    this.image = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.image)
    )
    this.license = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.license)
    )
    this.model = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.model)
    )
    this.type = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.type)
    )
    this.color = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.color)
    )
    this.km = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.km)
    )
    this.cares = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.cares, 0),
      filter(value => !!value),
      pluck(EAction.actionDate)
    )
    this.hand = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.hand),
      map(hand => hand - 1)
    )
    this.productionDate = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.productionDate)
    )
    this.testExpirationDate = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.tests, 0),
      filter(value => !!value),
      pluck(ETest.expirationDate)
    )
    this.fuels = data.pipe(
      filter(value => !!value),
      pluck(EAction.actionDate),
     // map(value => mean(value))
    )
    this.productionYear = this.productionDate.pipe(
      map(value => new Date(value).getFullYear())
    )
    this.productionMonth = this.productionDate.pipe(
      map(value => new Date(value).getMonth())
    )
    this.testExpirationDateYear = this.testExpirationDate.pipe(
      map(value => new Date(value).getFullYear())
    )
    this.testExpirationDateMonth = this.testExpirationDate.pipe(
      map(value => new Date(value).getMonth())
    )
    this.productionDiffMonths = this.productionDate.pipe(
      map(value => moment(value).diff(new Date, `months`)),
      filter((value: number) => !!(value % 12)),
    )
    this.productionDiffYears = this.productionDate.pipe(
      map(value => moment(value).diff(new Date, `years`))
    )
    this.loading = personVehiclesDataService.loading.pipe(
      delay(0),
      takeUntil(componentLeave)
    )
    this.careGetYear = this.cares.pipe(
      map(value => new Date(value).getFullYear())
    )
    this.GcaretMonth = this.cares.pipe(
     map(value => new Date(value).getMonth())
    )
    this.getMonth = this.cares.pipe(
      map(value => new Date(value).getMonth())
     )
  }

  handleEdit() { }

  handleMore($event) {
    from(
      this.popoverController.create({
        event: $event,
        component: VehicleMoreOptionsModalComponent,
        cssClass: `app-vehicle-more-options-modal-wrapper`,
        showBackdrop: false
      })
    ).
      pipe(
        tap(modal => modal.present())
      ).
      subscribe()
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
