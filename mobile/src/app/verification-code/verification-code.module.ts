import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AppSharedModule } from '../app-shared.module'
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
    AppSharedModule
  ],
  declarations: [VerificationCodePage]
})
export class VerificationCodePageModule {}
