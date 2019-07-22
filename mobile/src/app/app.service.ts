import { BehaviorSubject, from } from 'rxjs'
import { finalize, switchMap, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { LoadingController, ToastController } from '@ionic/angular'
import { environment } from '../environments/environment'
import { LanguageService } from './language/language.service'
import { LogService } from './log/log.service'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    readonly logService: LogService,
    private readonly toastController: ToastController,
    private readonly languageService: LanguageService,
    private readonly loadingController: LoadingController) {
    logService.debugInstance(this)
  }

  createAsyncOperation(description = ``) {

    const asyncOperation = new BehaviorSubject<boolean>(null)

    from(this.loadingController.create({ message: description })).
      pipe(switchMap(loading => asyncOperation.pipe(
        tap(play => {
          if (play) loading.present()
        }),
        finalize(() => loading.dismiss())
      ))).
      subscribe()

    return asyncOperation

  }

  indicateError(message = ``) {
    (async () => {

      const
        { toastController, languageService } = this,
        toast = await toastController.create({
          message: message || await languageService.valueOfAsync(`GENERAL_ERROR`),
          closeButtonText: await languageService.valueOfAsync(`OK_TEXT`),
          showCloseButton: true
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
          closeButtonText: await languageService.valueOfAsync(`OK_TEXT`),
          color: `primary`
        })

      toast.present()

    })()
  }

  locationImage(fileName: string) {
    return `${environment.serverUrl}/static/server/images/${fileName}`
  }

}
