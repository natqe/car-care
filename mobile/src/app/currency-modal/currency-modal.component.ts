import { BehaviorSubject } from 'rxjs'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { IonSearchbar, ModalController } from '@ionic/angular'
import { Currency, ECurrency } from '../currency/currency.model'
import { CurrencyService } from '../currency/currency.service'
import { LogService } from '../log/log.service'

@Component({
  selector: 'app-currency-modal',
  templateUrl: './currency-modal.component.html',
  styleUrls: ['./currency-modal.component.scss'],
})
export class CurrencyModalComponent implements OnInit {

  readonly _searchbar = new BehaviorSubject<this['searchbar']>(null)

  readonly _selected = new BehaviorSubject<this['selected']>(null)

  readonly ECurrency = ECurrency

  @Input()
  set selected(value: Currency) {
    this._selected.next(value)
  }

  @ViewChild(IonSearchbar, { static: true })
  set searchbar(value: IonSearchbar) {
    this._searchbar.next(value)
  }

  constructor(
    readonly logService: LogService,
    readonly modalController: ModalController,
    readonly currencyService: CurrencyService) {
    logService.debugInstance(this)
  }

  ngOnInit() { }

}
