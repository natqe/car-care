import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { PersonService } from '../person/person.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly storage: Storage,
    private readonly personService: PersonService,
    private readonly navController: NavController) { console.log(this) }

  async canActivate() {

    const
      { storage, navController, personService } = this,
      [welcome, confirm] = await Promise.all([
        <Promise<boolean>>storage.get(`welcome-end`),
        personService.isConfirm.toPromise()
      ])

    if (!welcome || confirm) {

      navController.navigateRoot(`/tabs/main`)

      return false

    }
    else return true

  }

}
