import { timeout } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { UtilService } from '../util/util.service'
import { FullNameService } from './full-name.service'

interface IControls {
  fullName: FormControl
  [key: string]: AbstractControl
}

@Component({
  selector: 'app-full-name',
  templateUrl: './full-name.page.html',
  styleUrls: ['./full-name.page.scss'],
})
export class FullNamePage extends FormGroup implements OnInit {

  readonly controls: IControls

  constructor(
    private readonly utilService: UtilService,
    private readonly fullNameService: FullNameService) {
    super(<IControls>{
      fullName: new FormControl(null, [Validators.required])
    })
  }

  handleSubmit() {

    const { controls, valid, fullNameService, utilService } = this

    if (valid) {

      const
        asyncOperation = utilService.createAsyncOperation(),
        loadingSubscription = fullNameService.loading
          .pipe(timeout(1500))
          .subscribe(inLoadProcess => {
            if (inLoadProcess) asyncOperation.next(true)
            else if (asyncOperation.value) {

              asyncOperation.complete()

              loadingSubscription.unsubscribe()

            }
          })

      fullNameService.setValue(controls.fullName.value)

    }

  }

  ngOnInit() {
  }

}
