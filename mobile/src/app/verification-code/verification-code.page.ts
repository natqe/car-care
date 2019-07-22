import { Subject } from 'rxjs'
import { filter, takeUntil, tap } from 'rxjs/operators'
import { Component, OnDestroy } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { AppService } from '../app.service'
import { FormControls } from '../form/form.model'
import { LogService } from '../log/log.service'
import { PersonDataService } from '../person/person-data.service'

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.page.html',
  styleUrls: ['./verification-code.page.scss'],
})
export class VerificationCodePage extends FormGroup implements OnDestroy {

  readonly value: {
    code: string
  }

  readonly controls: FormControls<this>

  private readonly componentLeave = new Subject

  constructor(
    readonly personDataService: PersonDataService,
    logService: LogService,
    private readonly navController: NavController,
    private readonly appService: AppService) {

    super(<this['controls']>{
      code: new FormControl(null, [Validators.required, Validators.pattern(/^\d{6}$/)])
    })

    logService.debugInstance(this)

  }

  ionViewWillEnter() {

    const { statusChanges, componentLeave } = this

    statusChanges.pipe(filter(status => status === 'VALID'), takeUntil(componentLeave)).subscribe(() => this.handleSubmit())

  }

  ionViewWillLeave() {
    this.componentLeave.next()
  }

  ngOnDestroy() {
    this.componentLeave.complete()
  }

  handleSubmit() {
    const
      { appService, personDataService, value, navController } = this,
      asyncOperation = appService.createAsyncOperation()
    asyncOperation.next(true)
    personDataService.
      confirmPerson(value.code).
      pipe(
        tap(() => asyncOperation.complete()),
        tap(isConfirm => {
          if (isConfirm) navController.navigateRoot(`/full-name`)
          else appService.indicateError()
        })
      ).
      subscribe()
  }

}
