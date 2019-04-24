import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { SharedModule } from '../shared/shared.module'
import { TabsPage } from './tabs.page'
import { TabsPageRoutingModule } from './tabs.router.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    SharedModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
