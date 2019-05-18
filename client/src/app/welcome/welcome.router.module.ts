import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomePage } from './welcome.page'

const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
    children: [
      { path: 'welcome-start', loadChildren: '../welcome-start/welcome-start.module#WelcomeStartPageModule' },
      { path: 'welcome-end', loadChildren: '../welcome-end/welcome-end.module#WelcomeEndPageModule' },
      { path: '', redirectTo: 'welcome-start', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'welcome-start', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePageRoutingModule { }
