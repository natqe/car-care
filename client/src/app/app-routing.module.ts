import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { WelcomeGuard } from './welcome/welcome.guard'

const routes: Routes = [
  {
    path: 'welcome',
    canActivate: [WelcomeGuard],
    async loadChildren() {

      const { WelcomePageModule } = await import(`./welcome/welcome.module`)

      return WelcomePageModule

    }
  },
  {
    path: 'auth',
    canActivate: [WelcomeGuard, AuthGuard],
    async loadChildren() {

      const { AuthPageModule } = await import(`./auth/auth.module`)

      return AuthPageModule

    }
  },
  {
    path: 'tabs',
    canActivate: [WelcomeGuard, AuthGuard],
    async loadChildren() {

      const { TabsPageModule } = await import(`./tabs/tabs.module`)

      return TabsPageModule

    }
  },
  { path: '', redirectTo: '/welcome/welcome-start', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
