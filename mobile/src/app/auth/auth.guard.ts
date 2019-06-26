import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { AppService } from '../app.service'
import { LogService } from '../log/log.service'
import { PersonService } from '../person/person.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly logService: LogService,
    private readonly appService: AppService,
    private readonly personService: PersonService) {
    logService.debugInstance(this)
  }

  async canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {

    const { appService, personService } = this

    return appService.handleCanActivate({
      can: await personService.isConfirm.toPromise(),
      defaultPath: `/tabs/main`,
      handlePath: `auth`,
      activatedRouteSnapshot
    })

  }

}
