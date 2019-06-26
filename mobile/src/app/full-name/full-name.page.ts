import { timeout } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { LogService } from '../log/log.service'
import { UtilService } from '../util/util.service'
import { FullNameService } from './full-name.service'

@Component({
  selector: 'app-full-name',
  templateUrl: './full-name.page.html',
  styleUrls: ['./full-name.page.scss'],
})
export class FullNamePage extends FormGroup implements OnInit {

  readonly value: {
    readonly fullName: string
  }

  readonly controls: {
    readonly fullName: FormControl & { value: FullNamePage['value']['fullName'] }
  }

  constructor(
    private readonly logService: LogService,
    private readonly utilService: UtilService,
    private readonly navController: NavController,
    private readonly fullNameService: FullNameService) {

    super(<this['controls']>{
      fullName: new FormControl(null, [Validators.required, Validators.pattern(fullNameService.pattern)])
    })

    logService.debugInstance(this)

  }

  handleSubmit() {

    const { valid, fullNameService, utilService, value, navController } = this

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

      fullNameService.setValue(value.fullName).subscribe(response => {
        if(response) navController.navigateRoot(`/tabs/main`)
      })

    }

  }

  ngOnInit() {
  }

}
