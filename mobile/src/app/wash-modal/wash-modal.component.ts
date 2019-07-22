import { Subject } from 'rxjs'
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { AppService } from '../app.service'
import { Currency } from '../currency/currency.model'
import { CurrencyService } from '../currency/currency.service'
import { FormControls, IFormControl } from '../form/form.model'
import { Vehicle } from '../vehicle/vehicle.model'
import { WashDataService } from '../wash/wash-data.service'
import { WithPrice } from '../with-price/with-price.model'

@Component({
  selector: 'app-wash-modal',
  templateUrl: './wash-modal.component.html',
  styleUrls: ['./wash-modal.component.scss'],
})
export class WashModalComponent extends FormGroup implements OnInit, OnDestroy {

  private static now: ReturnType<Date['toISOString']>

  readonly value: {
    actionDate: string
    currency: Currency
    price: WithPrice['price']
  }

  readonly controls: FormControls<this> & {
    currency: IFormControl<WashModalComponent, 'currency'>
  }

  @Input()
  vehicle: Vehicle['_id']

  private readonly componentEnd = new Subject

  readonly now = WashModalComponent.now

  constructor(
    private readonly currencyService: CurrencyService,
    private readonly appService: AppService,
    private readonly modalController: ModalController,
    private readonly washDataService: WashDataService) {
    super(<this['controls']>{
      actionDate: new FormControl(WashModalComponent.now = new Date().toISOString(), [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required])
    })
  }

  handleSubmit() {
    const
      { washDataService, value, vehicle, appService, modalController, valid } = this,
      { currency, ...withoutCurrency } = value,
      asyncOperation = appService.createAsyncOperation()
    if (valid) {
      asyncOperation.next(true)
      washDataService.createItem({ vehicle, ...withoutCurrency, currency: currency.code })
      washDataService.creatingSuccess.
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
    const { controls: { currency }, componentEnd, currencyService } = this
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
