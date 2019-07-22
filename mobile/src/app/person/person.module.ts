import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { AppSharedModule } from '../app-shared.module'
import { PersonPage } from './person.page'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PersonPage }]),
    AppSharedModule
  ],
  declarations: [PersonPage]
})
export class PersonPageModule {}
