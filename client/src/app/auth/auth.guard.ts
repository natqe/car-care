import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { PersonService } from '../person/person.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly personService: PersonService,
    private readonly navController: NavController) { console.log(this) }

  async canActivate({ url: [{ path }] }: ActivatedRouteSnapshot) {

    const
      { navController, personService } = this,
      confirm = await personService.isConfirm.toPromise(),
      mainUrl = `/tabs/main`,
      confirmPath = `auth/phone`,
      isConfirmPath = path === confirmPath

    if (!confirm) {
      if (isConfirmPath) return true
      else navController.navigateRoot(confirmPath)
    }
    else if (isConfirmPath) navController.navigateRoot(mainUrl)
    else return true

  }

}
