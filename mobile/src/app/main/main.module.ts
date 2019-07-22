import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AppSharedModule } from '../app-shared.module'
import { MainPage } from './main.page'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MainPage }]),
    AppSharedModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
