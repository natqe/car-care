import { interval, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core'
import { IonTabButton } from '@ionic/angular'
import { Care } from '../care/care.model'
import { Fuel } from '../fuel/fuel.model'
import { Test } from '../test/test.model'
import { Wash } from '../wash/wash.modal'

@Component({
  selector: 'app-archive',
  templateUrl: 'archive.page.html',
  styleUrls: ['archive.page.scss']
})
export class ArchivePage implements OnDestroy {

  @ViewChildren(IonTabButton, { read: ElementRef })
  tabs: QueryList<ElementRef<HTMLIonTabButtonElement>>

  readonly vehicle = {
    state: {
      care: new Care,
      wash: new Wash,
      fuel: new Fuel,
      test: new Test
    }
  }

  private readonly componentLeave = new Subject

  ionViewDidEnter() {

    const { componentLeave, tabs } = this

    interval(40).pipe(takeUntil(componentLeave)).subscribe(() =>
      tabs.forEach(({ nativeElement: { classList, dataset } }) => classList[location.pathname.split(`/`).pop() === dataset.label ? `add` : `remove`](`tab-selected`)))

  }

  ionViewWillLeave() {
    this.componentLeave.next()
  }

  ngOnDestroy() {
    this.componentLeave.complete()
  }

}
