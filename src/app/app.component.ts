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
   * @description Do some things after app initialize
   * @author Natan Farkash
   */
  async initializeApp() {

    const
      { platform, statusBar, splashScreen } = this,
      { documentElement } = document

    await platform.ready()

    documentElement.style.setProperty(`--initial-vh`, `${platform.height()}px`)

    documentElement.style.setProperty(`--initial-vw`, `${platform.width()}px`)

    if (platform.is(`ios`)) statusBar.overlaysWebView(false)

    statusBar.backgroundColorByHexString(getComputedStyle(documentElement).getPropertyValue('--ion-color-primary'))

    splashScreen.hide()

  }

}
