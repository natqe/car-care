import { first, map, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router'
import { NavController } from '@ionic/angular'
import { LogService } from './log/log.service'

interface IHandleCanActivateOptions {
  defaultPath: string
  can: boolean
  handlePath: string,
  activatedRouteSnapshot: ActivatedRouteSnapshot
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private readonly logService: LogService,
    private readonly navController: NavController) { }

  handleCanActivate({ defaultPath, can, handlePath, activatedRouteSnapshot: { url: [{ path }] } }: IHandleCanActivateOptions) {

    const
      { navController, logService } = this,
      isHandlePath = path === handlePath

    if (!can) {
      if (isHandlePath) return true
      else navController.navigateRoot(handlePath)
    }
    else if (isHandlePath) navController.navigateRoot(defaultPath)
    else return true

  }

}
