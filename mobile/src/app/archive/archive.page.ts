import { interval, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core'
import { IonTabButton } from '@ionic/angular'

@Component({
  selector: 'app-archive',
  templateUrl: 'archive.page.html',
  styleUrls: ['archive.page.scss']
})
export class ArchivePage implements OnDestroy {

  @ViewChildren(IonTabButton, { read: ElementRef })
  tabs: QueryList<ElementRef<HTMLIonTabButtonElement>>

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
