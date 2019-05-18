import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../shared/shared.module'
import { AuthPhonePage } from './auth-phone.page'

const routes: Routes = [
  {
    path: '',
    component: AuthPhonePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AuthPhonePage]
})
export class AuthPhonePageModule {}
