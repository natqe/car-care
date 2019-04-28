import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { CareModalComponent } from '../care-modal/care-modal.component'
import { FuelModalComponent } from '../fuel-modal/fuel-modal.component'
import { LanguagePipe } from '../language/language.pipe'
import { TestModalComponent } from '../test-modal/test-modal.component'
import { WashModalComponent } from '../wash-modal/wash-modal.component'

const
  entryComponents = [
    FuelModalComponent,
    CareModalComponent,
    TestModalComponent,
    WashModalComponent
  ],
  components = [
    LanguagePipe,
    ...entryComponents
  ],
  imports = [
    FormsModule,
    ReactiveFormsModule
  ]

@NgModule({
  declarations: [...components],
  entryComponents: [...entryComponents],
  imports: [CommonModule, IonicModule, ...imports],
  exports: [...components, ...imports]
})
export class SharedModule { }
