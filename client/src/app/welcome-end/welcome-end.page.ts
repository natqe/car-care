import { Component, OnInit } from '@angular/core'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-welcome-end',
  templateUrl: './welcome-end.page.html',
  styleUrls: ['./welcome-end.page.scss'],
})
export class WelcomeEndPage implements OnInit {

  constructor(private readonly storage: Storage) { }

  saveWelcomeEnd() {
    this.storage.set(`welcome-end`, true)
  }

  ngOnInit() {
  }

}
