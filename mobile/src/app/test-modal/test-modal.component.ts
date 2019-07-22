import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import range from 'lodash/range'
import times from 'lodash/times'
import moment from 'moment'
import { of } from 'rxjs'
import { catchError, filter, first, pluck, tap } from 'rxjs/operators'
import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { Action } from '../action/action.model'
import { AppService } from '../app.service'
import { FormControls } from '../form/form.model'
import { LogService } from '../log/log.service'
import { TestDataService } from '../test/test-data.service'
import { Test } from '../test/test.model'
import { UtilService } from '../util/util.service'
import { Vehicle } from '../vehicle/vehicle.model'

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss'],
})
export class TestModalComponent extends FormGroup implements OnInit {

  private static _options: Array<string>

  private static now: ReturnType<Date['toISOString']>

  private static get options() {
    if (!this._options) this._options = range(.5, 2, .5).map(n => moment().add(n, `years`).toISOString())
    return this._options
  }

  readonly value: {
    expirationDate: Test['expirationDate'],
    actionDate: Action['actionDate']
  }

  readonly controls: FormControls<this>

  @Input()
  vehicle: Vehicle['_id']

  readonly options = TestModalComponent.options

  readonly now = TestModalComponent.now

  readonly yearValues = times(6, n => new Date().getFullYear() + n)

  constructor(
    readonly modalController: ModalController,
    readonly logService: LogService,
    private readonly appService: AppService,
    private readonly testDataService: TestDataService) {
    super({
      expirationDate: new FormControl(TestModalComponent.options[0], [Validators.required]),
      actionDate: new FormControl(TestModalComponent.now = new Date().toISOString(), [Validators.required]),
    })
    logService.debugInstance(this)
  }

  handleSubmit() {
    const
      { testDataService, value, vehicle, appService, modalController, valid } = this,
      asyncOperation = appService.createAsyncOperation()
    if (valid) {
      asyncOperation.next(true)
      testDataService.createItem({ vehicle, ...value })
      testDataService.creatingSuccess.
        pipe(
          first(),
          tap(() => asyncOperation.complete()),
          filter(Boolean),
          tap(() => modalController.dismiss())
        ).
        subscribe()
    }
  }

  ngOnInit() { }

}
