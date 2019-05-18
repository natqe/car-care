import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly storage: Storage,
    private readonly navController: NavController) { }

  async canActivate() {

    const { storage, navController } = this

    if (!await storage.get(`welcome-end`)) {

      navController.navigateRoot(``)

      return false

    }
    else return true

  }

}
