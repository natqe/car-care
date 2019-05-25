import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { LanguageService } from '../language/language.service'
import { EPerson } from '../person/person.model'
import { PersonService } from '../person/person.service'
import { UtilService } from '../util/util.service'

enum EControlsNames {
  code = 'code'
}

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.page.html',
  styleUrls: ['./verification-code.page.scss'],
})
export class VerificationCodePage extends FormGroup implements OnInit {

  constructor(
    readonly personService: PersonService,
    private readonly navController: NavController,
    private readonly utilService: UtilService) {
    super({
      [EControlsNames.code]: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  console.log(this)}

  readonly EControlsNames = EControlsNames

  readonly EPerson = EPerson

  handleSubmit() {

    const
      { utilService, personService, controls, navController } = this,
      asyncOperation = utilService.createAsyncOperation()

    asyncOperation.next(true)

    personService.confirm(controls[EControlsNames.code].value).subscribe(isConfirm => {

      asyncOperation.complete()

      if (isConfirm) navController.navigateRoot(`/tabs/main`)
      else utilService.indicateError()

    })

  }

  ngOnInit() {
  }

}
