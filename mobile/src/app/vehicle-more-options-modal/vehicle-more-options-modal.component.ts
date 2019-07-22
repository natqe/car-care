import { forkJoin } from 'rxjs'
import { filter, switchMap, switchMapTo, take, tap } from 'rxjs/operators'
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { AlertController, PopoverController } from '@ionic/angular'
import { AppService } from '../app.service'
import { LanguageService } from '../language/language.service'
import { PersonVehiclesDataService } from '../person/person-vehicles-data.service'
import { Vehicle } from '../vehicle/vehicle.model'

@Component({
  selector: 'app-vehicle-more-options-modal',
  templateUrl: './vehicle-more-options-modal.component.html',
  styleUrls: ['./vehicle-more-options-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleMoreOptionsModalComponent implements OnInit {

  @Input()
  _id: Vehicle['_id']

  constructor(
    readonly popoverController: PopoverController,
    private readonly personVehiclesDataService: PersonVehiclesDataService,
    private readonly appService: AppService,
    private readonly languageService: LanguageService,
    private readonly alertController: AlertController) { }

  ngOnInit() { }

  handleDelete() {
    const
      { alertController, languageService, popoverController, appService, personVehiclesDataService, _id } = this,
      asyncOperation = appService.createAsyncOperation(),
      okRole = `ok`
    popoverController.dismiss()
    forkJoin([`CANCEL_TEXT`, `OK_TEXT`, `VehicleMoreOptionsModalComponent.delete_subHeader`, `VehicleMoreOptionsModalComponent.delete_message`].map(key => languageService.valueOf(key))).
      pipe(
        switchMap(([cancelText, okText, subHeader, message]) => alertController.create({
          subHeader, message,
          buttons: [
            cancelText,
            {
              cssClass: `color-medium`,
              text: okText,
              role: okRole
            },
          ]
        })),
        tap(alert => alert.present()),
        switchMap(alert => alert.onWillDismiss()),
        filter(({ role }) => role === okRole),
        tap(() => asyncOperation.next(true)),
        switchMapTo(personVehiclesDataService.deleteVehicle({ _id })),
        switchMapTo(personVehiclesDataService.deletingSuccess),
        take(1),
        tap(() => asyncOperation.complete()),
        filter(success => !success),
        switchMapTo(languageService.valueOf(`VehicleMoreOptionsModalComponent.delete_error`)),
        tap(message => appService.indicateError(message))
      ).
      subscribe()
  }

}
