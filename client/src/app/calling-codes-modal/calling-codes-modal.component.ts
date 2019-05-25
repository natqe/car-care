import isEqual from 'lodash/isEqual'
import { Subject } from 'rxjs'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { ModalController, Platform } from '@ionic/angular'
import { CallingCode, ECallingCode } from '../calling-code/calling-code.model'
import { CountryService } from '../country/country.service'
import { ENation } from '../nation/nation.abstract'

@Component({
  selector: 'app-calling-codes-modal',
  templateUrl: './calling-codes-modal.component.html',
  styleUrls: ['./calling-codes-modal.component.scss'],
})
export class CallingCodesModalComponent implements OnInit, OnDestroy {

  @Input()
  selected: CallingCode

  constructor(
    readonly platform: Platform,
    readonly modalController: ModalController,
    readonly countryService: CountryService) { }

  private readonly componentEnd = new Subject

  readonly ECallingCode = ECallingCode

  readonly ENation = ENation

  isSelected(value: this['selected']) {
    return isEqual(value, this.selected)
  }

  ngOnInit() { }

  ngOnDestroy() {

    const { componentEnd } = this

    componentEnd.next()

    componentEnd.complete()

  }

}
