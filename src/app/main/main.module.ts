import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../shared/shared.module'
import { MainPage } from './main.page'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: MainPage }]),
    SharedModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
