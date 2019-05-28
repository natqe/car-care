import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot } from '@angular/router'
import { NavController } from '@ionic/angular'

interface IHandleCanActivateOptions {
  defaultPath: string
  can: boolean
  handlePath: string
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private readonly navController: NavController,
    private readonly activatedRouteSnapshot: ActivatedRouteSnapshot) { }

  async handleCanActivate({ defaultPath, can, handlePath }: IHandleCanActivateOptions) {

    const
      { navController } = this,
      isHandlePath = this.activatedRouteSnapshot.url[0].path === handlePath

    if (!can) {
      if (isHandlePath) return true
      else navController.navigateRoot(handlePath)
    }
    else if (isHandlePath) navController.navigateRoot(defaultPath)
    else return true

  }

}
