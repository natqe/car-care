import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AppSharedModule } from '../app-shared.module'
import { PhonePage } from './phone.page'

const routes: Routes = [
  {
    path: '',
    component: PhonePage
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
  declarations: [PhonePage]
})
export class PhonePageModule {}
