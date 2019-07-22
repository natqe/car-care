import { Subject } from 'rxjs'
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { AppService } from '../app.service'
import { Currency } from '../currency/currency.model'
import { CurrencyService } from '../currency/currency.service'
import { FormControls, IFormControl } from '../form/form.model'
import { FuelDataService } from '../fuel/fuel-data.service'
import { Vehicle } from '../vehicle/vehicle.model'
import { WithPrice } from '../with-price/with-price.model'

@Component({
  selector: 'app-fuel-modal',
  templateUrl: './fuel-modal.component.html',
  styleUrls: ['./fuel-modal.component.scss'],
})
export class FuelModalComponent extends FormGroup implements OnInit, OnDestroy {

  private static now: ReturnType<Date['toISOString']>

  readonly value: {
    actionDate: string
    currency: Currency
    price: WithPrice['price']
  }

  readonly controls: FormControls<this> & {
    currency: IFormControl<FuelModalComponent, 'currency'>
  }

  @Input()
  vehicle: Vehicle['_id']

  private readonly componentEnd = new Subject

  readonly now = FuelModalComponent.now

  constructor(
    private readonly currencyService: CurrencyService,
    private readonly appService: AppService,
    private readonly modalController: ModalController,
    private readonly fuelDataService: FuelDataService) {
    super(<this['controls']>{
      actionDate: new FormControl(FuelModalComponent.now = new Date().toISOString(), [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      currency: new FormControl(null, [Validators.required])
    })
  }

  handleSubmit() {
    const
      { fuelDataService, value, vehicle, appService, modalController, valid } = this,
      { currency, ...withoutCurrency } = value,
      asyncOperation = appService.createAsyncOperation()
    if (valid) {
      asyncOperation.next(true)
      fuelDataService.createItem({ vehicle, ...withoutCurrency, currency: currency.code })
      fuelDataService.creatingSuccess.
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
