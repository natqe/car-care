import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../shared.module'
import { VerificationCodePage } from './verification-code.page'

const routes: Routes = [
  {
    path: '',
    component: VerificationCodePage
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
  declarations: [VerificationCodePage]
})
export class VerificationCodePageModule {}
