import { BehaviorSubject, from } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { LoadingController, ToastController } from '@ionic/angular'
import { LanguageService } from '../language/language.service'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private readonly toastController: ToastController,
    private readonly languageService: LanguageService,
    private readonly loadingController: LoadingController) { }

  createAsyncOperation(description = ``) {

    const asyncOperation = new BehaviorSubject<boolean>(null)

    this.loadingController.
      create({
        message: description
      }).
      then(loading => asyncOperation.subscribe({
        next: play => {
          if (play) loading.present()
        },
        complete: () => loading.dismiss()
      }))

    return asyncOperation

  }

  indicateError(message = ``) {
    (async () => {

      const
        { toastController, languageService } = this,
        toast = await toastController.create({
          message: message || await languageService.valueOf(`GENERAL_ERROR`).toPromise(),
          showCloseButton: true,
          closeButtonText: await languageService.valueOf(`OK_TEXT`).toPromise()
        })

      toast.present()

    })()
  }

  deliverateInfo(message: string) {
    (async () => {

      const
        { toastController, languageService } = this,
        toast = await toastController.create({
          message,
          showCloseButton: true,
          closeButtonText: await languageService.valueOf(`OK_TEXT`).toPromise(),
          color: `primary`
        })

      toast.present()

    })()
  }

}
