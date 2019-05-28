import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { PersonService } from '../person/person.service'

@Injectable({
  providedIn: 'root'
})
export class TabsGuard implements CanActivate {

  constructor(
    private readonly storage: Storage,
    private readonly navController: NavController,
    private readonly personService: PersonService) { }

  canActivate() {

    const { navController, personService } = this

    return true

  }

}
