import { Subject } from 'rxjs'
import { filter, first, takeUntil } from 'rxjs/operators'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { LogService } from '../log/log.service'
import { EPerson } from '../person/person.model'
import { PersonService } from '../person/person.service'
import { UtilService } from '../util/util.service'

interface IVerificationCodeControls{
  readonly code: FormControl
  readonly [key: string]: AbstractControl
}

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.page.html',
  styleUrls: ['./verification-code.page.scss'],
})
export class VerificationCodePage extends FormGroup implements OnDestroy {

  readonly controls: IVerificationCodeControls

  private readonly componentLeave = new Subject

  constructor(
    readonly personService: PersonService,
    private readonly logService: LogService,
    private readonly navController: NavController,
    private readonly utilService: UtilService) {

    super(<IVerificationCodeControls>{
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
      { utilService, personService, controls, navController } = this,
      asyncOperation = utilService.createAsyncOperation()

    asyncOperation.next(true)

    personService.confirm(controls.code.value).subscribe(isConfirm => {

      asyncOperation.complete()

      if (isConfirm) navController.navigateRoot(`/full-name`)
      else utilService.indicateError()

    })

  }

}
