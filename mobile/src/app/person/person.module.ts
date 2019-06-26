import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../shared.module'
import { PersonPage } from './person.page'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PersonPage }]),
    SharedModule
  ],
  declarations: [PersonPage]
})
export class PersonPageModule {}
