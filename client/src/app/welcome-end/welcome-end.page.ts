import { Component, OnInit } from '@angular/core'
import { NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-welcome-end',
  templateUrl: './welcome-end.page.html',
  styleUrls: ['./welcome-end.page.scss'],
})
export class WelcomeEndPage implements OnInit {

  constructor(
    private readonly navController: NavController,
    private readonly storage: Storage) { }

  async handleEnd() {

    const { storage, navController } = this

    storage.set(`welcome-end`, true)

    navController.navigateRoot(`/auth/phone`)

  }

  ngOnInit() {
  }

}
