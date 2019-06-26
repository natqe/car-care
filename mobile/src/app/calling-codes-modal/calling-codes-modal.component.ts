import isEqual from 'lodash/isEqual'
import { Subject } from 'rxjs'
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { IonHeader, IonSearchbar, ModalController, Platform } from '@ionic/angular'
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

  @ViewChild(IonSearchbar, { static: true })
  searchbar: IonSearchbar

  constructor(
    readonly platform: Platform,
    readonly modalController: ModalController,
    readonly countryService: CountryService) { }

  private readonly componentEnd = new Subject

  readonly ECallingCode = ECallingCode

  readonly ENation = ENation

  @ViewChild(IonHeader, { read: ElementRef, static: true })
  set header({ nativeElement }: ElementRef<HTMLIonHeaderElement>) {
    if (nativeElement && this.platform.is(`ios`)) nativeElement.setAttribute('no-border', null)
  }

  isSelected(value: this['selected']) {
    return isEqual(value, this.selected)
  }

  ngOnInit() {

    const { searchbar, platform } = this

    if (!platform.is(`ios`)) searchbar.getInputElement().then(({ style }) => style.boxShadow = `unset`)

  }

  ngOnDestroy() {

    const { componentEnd } = this

    componentEnd.next()

    componentEnd.complete()

  }

}
