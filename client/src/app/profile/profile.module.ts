import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../shared/shared.module'
import { ProfilePage } from './profile.page'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }]),
    SharedModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
