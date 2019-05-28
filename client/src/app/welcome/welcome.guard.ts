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
      nextUrl = `/auth/phone`,
      welcomePath = `welcome`,
      isWelcomePath = path === welcomePath

    if (!welcomeEnd) {
      if (isWelcomePath) return true
      else navController.navigateRoot(welcomePath)
    }
    else if (isWelcomePath) navController.navigateRoot(nextUrl)
    else return true

  }

}