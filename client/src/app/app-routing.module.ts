import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { TabsGuard } from './tabs/tabs.guard'
import { WelcomeGuard } from './welcome/welcome.guard'

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: './welcome/welcome.module#WelcomePageModule',
    canActivate: [WelcomeGuard]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthPageModule',
    canActivate: [WelcomeGuard, AuthGuard]
  },
  {
    path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [WelcomeGuard, TabsGuard]
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
