import { from } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { NavController, Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { AppGuard } from '../app.guard'

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard extends AppGuard {

  protected readonly defaultPath = `/auth/phone`

  protected readonly handlePath = `welcome`

  protected readonly determineCanActive = from(this.platform.ready()).pipe(
    switchMap(() => this.storage.get(`welcome-end`))
  )

  constructor(navController: NavController,
    private readonly storage: Storage,
    private readonly platform: Platform) {
    super(navController)
  }

}