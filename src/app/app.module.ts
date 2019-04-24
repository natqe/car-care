import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { Keyboard } from '@ionic-native/keyboard/ngx'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LanguageService } from './language/language.service'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        deps: [HttpClient],
        useFactory: (httpClient: HttpClient) =>{
          return new TranslateHttpLoader(httpClient)
        }
      }
    }),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LanguageService,
    TranslateService,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
