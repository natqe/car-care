import { Component } from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Platform } from '@ionic/angular'

/**
 * @classdesc Control app component
 * @returns instance
 * @author Natan Farkash
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private readonly platform: Platform,
    private readonly splashScreen: SplashScreen,
    private readonly statusBar: StatusBar) {
    this.initializeApp()
  }
  /**
   * @description Do your things after app initialize
   * @author Natan Farkash
   */
  async initializeApp() {

    const { platform, statusBar, splashScreen } = this

    await platform.ready()

    statusBar.hide()

    splashScreen.hide()

  }

}
