import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { AppService } from '../app.service'
import { LogService } from '../log/log.service'

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(logService: LogService,
    private readonly appService: AppService,
    private readonly platform: Platform,
    private readonly storage: Storage) {
    logService.debugInstance(this)
  }

  async canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {

    const { appService, storage, platform } = this

    await platform.ready()

    return appService.handleCanActivate({
      can: await storage.get(`welcome-end`),
      defaultPath: `/auth/phone`,
      handlePath: `welcome`,
      activatedRouteSnapshot
    })

  }

}