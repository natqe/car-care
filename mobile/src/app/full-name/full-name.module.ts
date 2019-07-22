import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AppSharedModule } from '../app-shared.module'
import { FullNamePage } from './full-name.page'

const routes: Routes = [
  {
    path: '',
    component: FullNamePage
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
  declarations: [FullNamePage]
})
export class FullNamePageModule {}
