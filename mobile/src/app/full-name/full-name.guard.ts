import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { NavController } from '@ionic/angular'
import { AppGuard } from '../app.guard'
import { FullNameService } from './full-name.service'

@Injectable({
  providedIn: 'root'
})
export class FullNameGuard extends AppGuard {

  protected readonly defaultPath = `/tabs/main`

  protected readonly handlePath = `full-name`

  protected readonly determineCanActive = this.fullNameService.getValue().pipe(
    map(value => !!value)
  )

  constructor(
    navController: NavController,
    private readonly fullNameService: FullNameService) {
    super(navController)
  }

}
