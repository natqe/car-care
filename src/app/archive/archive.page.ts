import { interval, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core'
import { IonTabButton } from '@ionic/angular'
import { Vehicle } from '../vehicle/vehicle.model'

@Component({
  selector: 'app-archive',
  templateUrl: 'archive.page.html',
  styleUrls: ['archive.page.scss']
})
export class ArchivePage {

  private componentEnd: Subject<any>

  @ViewChildren(IonTabButton, { read: ElementRef })
  tabs: QueryList<ElementRef<HTMLIonTabButtonElement>>

  readonly vehicle = new Vehicle

  ionViewDidEnter() {

    this.componentEnd = new Subject

    const { componentEnd, tabs } = this

    interval(40).pipe(takeUntil(componentEnd)).subscribe(n => tabs.forEach(({ nativeElement: { classList, dataset } }) => {
      classList[location.pathname.split(`/`).pop() === dataset.label ? `add` : `remove`](`tab-selected`)
    }))

  }

  ionViewWillLeave() {

    const { componentEnd } = this

    componentEnd.next()

    componentEnd.complete()

  }

}
