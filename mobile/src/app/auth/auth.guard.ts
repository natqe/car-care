import { Injectable } from '@angular/core'
import { NavController } from '@ionic/angular'
import { AppGuard } from '../app.guard'
import { PersonDataService } from '../person/person-data.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends AppGuard {

  protected readonly defaultPath = `/tabs/main`

  protected readonly handlePath = `auth`

  protected readonly determineCanActive = this.personDataService.isConfirm

  constructor(navController: NavController,
    private readonly personDataService: PersonDataService) {
    super(navController)
  }

}
