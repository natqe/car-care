import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WelcomePage } from './welcome.page'

const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
    children: [
      {
        path: 'welcome-start',
        async loadChildren() {
          const { WelcomeStartPageModule } = await import(`../welcome-start/welcome-start.module`)
          return WelcomeStartPageModule
        }
      },
      {
        path: 'welcome-end',
        async loadChildren() {
          const { WelcomeEndPageModule } = await import(`../welcome-end/welcome-end.module`)
          return WelcomeEndPageModule
        }
      },
      {
        path: '',
        redirectTo: 'welcome-start',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'welcome-start',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePageRoutingModule { }
