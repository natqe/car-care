import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { FullNameGuard } from './full-name/full-name.guard'
import { WelcomeGuard } from './welcome/welcome.guard'

const routes: Routes = [
  {
    path: 'welcome',
    async loadChildren() {
      const { WelcomePageModule } = await import(`./welcome/welcome.module`)
      return WelcomePageModule
    },
    canActivate: [WelcomeGuard]
  },
  {
    path: 'auth',
    async loadChildren() {
      const { AuthPageModule } = await import(`./auth/auth.module`)
      return AuthPageModule
    },
    canActivate: [WelcomeGuard, AuthGuard]
  },
  {
    path: 'full-name',
    async loadChildren() {
      const { FullNamePageModule } = await import(`./full-name/full-name.module`)
      return FullNamePageModule
    },
    canActivate: [WelcomeGuard, AuthGuard, FullNameGuard]
  },
  {
    path: 'tabs',
    async loadChildren() {
      const { TabsPageModule } = await import(`./tabs/tabs.module`)
      return TabsPageModule
    },
    canActivate: [WelcomeGuard, AuthGuard, FullNameGuard]
  },
  {
    path: '',
    redirectTo: '/welcome/welcome-start',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
