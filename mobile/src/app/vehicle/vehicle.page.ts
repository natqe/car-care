import { from, Observable, Subject } from 'rxjs'
import { delay, filter, map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PopoverController } from '@ionic/angular'
import { AppService } from '../app.service'
import { LogService } from '../log/log.service'
import { PersonVehiclesDataService } from '../person/person-vehicles-data.service'
import { VehicleMoreOptionsModalComponent } from '../vehicle-more-options-modal/vehicle-more-options-modal.component'
import { EVehicle, Vehicle } from './vehicle.model'

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

  productionDate: Observable<Vehicle['productionDate']>

  productionYear: Observable<ReturnType<Date['getFullYear']>>

  productionMonth: Observable<ReturnType<Date['getMonth']>>

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
    this.productionDate = data.pipe(
      filter(value => !!value),
      pluck(EVehicle.productionDate)
    )
    this.productionYear = this.productionDate.pipe(
      map(value => new Date(value).getFullYear())
    )
    this.productionMonth = this.productionDate.pipe(
      map(value => new Date(value).getMonth())
    )
    this.loading = personVehiclesDataService.loading.pipe(
      takeUntil(componentLeave)
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
