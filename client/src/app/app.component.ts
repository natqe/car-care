import { Component } from '@angular/core'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Platform } from '@ionic/angular'
import { ionCssVariable } from '../theme/variables/variables'
import { LanguageService } from './language/language.service'

/**
 * @classdesc Control app component
 * @author Natan Farkash
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(platform: Platform, splashScreen: SplashScreen, languageService: LanguageService, statusBar: StatusBar) {
    platform.ready().then(() => {

      languageService.init()

      if (platform.is(`ios`)) statusBar.overlaysWebView(false)

      const { documentElement } = document

      documentElement.style.setProperty(`--initial-vh`, `${platform.height()}px`)

      documentElement.style.setProperty(`--initial-vw`, `${platform.width()}px`)

      statusBar.backgroundColorByHexString(ionCssVariable(`color-primary`))

      splashScreen.hide()

    })
  }
}