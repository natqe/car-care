import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthPage } from './auth.page'

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      { path: 'phone', loadChildren: '../phone/phone.module#PhonePageModule' },
      { path: 'verification-code', loadChildren: '../verification-code/verification-code.module#VerificationCodePageModule' },
      { path: '', redirectTo: 'phone', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'phone', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule { }
