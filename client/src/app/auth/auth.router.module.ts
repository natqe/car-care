import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthPage } from './auth.page'

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'phone',
        async loadChildren() {

          const { PhonePageModule } = await import(`../phone/phone.module`)

          return PhonePageModule

        }
      },
      {
        path: 'verification-code',
        async loadChildren() {

          const { VerificationCodePageModule } = await import(`../verification-code/verification-code.module`)

          return VerificationCodePageModule

        }
      },
      {
        path: '',
        redirectTo: 'phone',
        pathMatch: 'full'
      }
    ]
  },
  { path: '', redirectTo: 'phone', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPageRoutingModule { }
