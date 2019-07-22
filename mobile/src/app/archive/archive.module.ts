import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { AppSharedModule } from '../app-shared.module'
import { ArchivePage } from './archive.page'
import { ArchivePageRoutingModule } from './archive.router.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ArchivePageRoutingModule,
    AppSharedModule
  ],
  declarations: [ArchivePage]
})
export class ArchivePageModule {}
