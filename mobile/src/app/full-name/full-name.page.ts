import { timeout } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { AppService } from '../app.service'
import { LogService } from '../log/log.service'
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
    private readonly appService: AppService,
    private readonly navController: NavController,
    private readonly fullNameService: FullNameService) {

    super(<this['controls']>{
      fullName: new FormControl(null, [Validators.required, Validators.pattern(fullNameService.pattern)])
    })

    logService.debugInstance(this)

  }

  handleSubmit() {

    const { valid, fullNameService, appService, value, navController } = this

    if (valid) {

      const
        asyncOperation = appService.createAsyncOperation(),
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
