import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { BehaviorSubject, from, of, Subject } from 'rxjs'
import { catchError, filter, first, pluck, startWith, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { AppService } from '../app.service'
import { CareDataService } from '../care/care-data.service'
import { Care, ECare, ECareType } from '../care/care.model'
import { CurrencyModalComponent } from '../currency-modal/currency-modal.component'
import { Currency } from '../currency/currency.model'
import { CurrencyService } from '../currency/currency.service'
import { FormControls, IFormControl } from '../form/form.model'
import { LogService } from '../log/log.service'
import { UtilService } from '../util/util.service'
import { Vehicle } from '../vehicle/vehicle.model'

@Component({
  selector: 'app-care-modal',
  templateUrl: './care-modal.component.html',
  styleUrls: ['./care-modal.component.scss']
})
export class CareModalComponent extends FormGroup implements OnInit, OnDestroy {

  private static now: ReturnType<Date['toISOString']>

  readonly value: {
    type: Care['type'],
    description: Care['type'],
    km: Care['km'],
    actionDate: Care['actionDate']
    price: Care['price'],
    currency: Currency
  }

  readonly controls: FormControls<this> & {
    currency: IFormControl<CareModalComponent, 'currency'>
  }

  private readonly _vehicle = new BehaviorSubject<this['vehicle']>(null)

  private readonly componentEnd = new Subject

  readonly ECareType = ECareType

  readonly now = CareModalComponent.now

  @Input()
  set vehicle(value: Vehicle['_id']) {
    this._vehicle.next(value)
  }

  constructor(
    readonly logService: LogService,
    readonly currencyService: CurrencyService,
    readonly modalController: ModalController,
    private readonly careDataService: CareDataService,
    private readonly appService: AppService,
    private readonly utilService: UtilService,
    private readonly apollo: Apollo) {

    super(<this['controls']>{
      actionDate: new FormControl(CareModalComponent.now = new Date().toISOString(), [Validators.required]),
      type: new FormControl(ECareType.period, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required])
    })

    logService.debugInstance(this)

  }

  openCurrencyModal() {

    const { modalController, value, controls } = this

    from(modalController.create({
      component: CurrencyModalComponent,
      componentProps: {
        selected: value.currency
      }
    })).
      pipe(
        tap(modal => modal.present()),
        switchMap(modal => modal.onDidDismiss()),
        pluck(`data`),
        filter(value => !!value),
        tap((data: Currency) => controls.currency.setValue(data))
      ).
      subscribe()

  }

  handleSubmit() {

    const
      { careDataService, value, _vehicle, appService, modalController, valid } = this,
      { currency, ...withoutCurrency } = value,
      asyncOperation = appService.createAsyncOperation()

    if (valid) {

      asyncOperation.next(true)

      careDataService.createItem({
        ...withoutCurrency,
        currency: currency.code,
        vehicle: _vehicle.getValue(),
      })

      careDataService.creatingSuccess.
        pipe(
          first(),
          tap(() => asyncOperation.complete()),
          filter(Boolean),
          tap(() => modalController.dismiss())
        ).
        subscribe()

    }

  }

  ngOnInit() {

    const
      { controls: { type, currency }, componentEnd, currencyService } = this,
      { mishap, other, period } = ECareType,
      { km, description } = ECare

    type.valueChanges.
      pipe(
        takeUntil(componentEnd),
        startWith(type.value),
        tap((value) => {

          if (value === period) this.addControl(km, new FormControl(null, [Validators.required]))
          else this.removeControl(km)

          if (value === mishap || value === other) this.addControl(description, new FormControl(null, [Validators.required]))
          else this.removeControl(description)

        })
      ).
      subscribe()

    currencyService.tempCurrency.
      pipe(
        first(),
        tap(value => currency.setValue(value, { emitEvent: false }))
      ).
      subscribe()

    currency.valueChanges.
      pipe(
        takeUntil(componentEnd),
        switchMap(value => currencyService.setTempCurrency(value))
      ).
      subscribe()

  }

  ngOnDestroy() {
    const { componentEnd } = this
    componentEnd.next()
    componentEnd.complete()
  }

}
