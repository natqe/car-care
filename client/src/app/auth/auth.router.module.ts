import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthPage } from './auth.page'

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      { path: 'auth-phone', loadChildren: '../auth-phone/auth-phone.module#AuthPhonePageModule' },
      { path: 'auth-code', loadChildren: '../auth-code/auth-code.module#AuthCodePageModule' },
      { path: '', redirectTo: 'auth-phone', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'auth-phone', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule { }
