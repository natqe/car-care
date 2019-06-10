import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { AppService } from '../app.service'
import { LogService } from '../log/log.service'
import { FullNameService } from './full-name.service'

@Injectable({
  providedIn: 'root'
})
export class FullNameGuard implements CanActivate {

  constructor(
    private readonly appService: AppService,
    private readonly logService: LogService,
    private readonly fullNameService: FullNameService) { }

  async canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {

    const { appService, fullNameService, logService } = this

    return appService.handleCanActivate({
      can: !!await fullNameService.getValue().toPromise(),
      defaultPath: `/tabs/main`,
      handlePath: `full-name`,
      activatedRouteSnapshot
    })

  }

}
