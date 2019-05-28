import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(
    private readonly storage: Storage,
    private readonly navController: NavController) { }

  async canActivate({ url: [{ path }] }: ActivatedRouteSnapshot) {

    const
      { storage, navController } = this,
      welcomeEnd = await storage.get(`welcome-end`),
      welcomePath = `welcome`

    if (!welcomeEnd) {
      if (path === welcomePath) return true
      else navController.navigateRoot(welcomePath)
    }
    else if (path === welcomePath) navController.navigateRoot(`/auth/phone`)
    else return true

  }

}