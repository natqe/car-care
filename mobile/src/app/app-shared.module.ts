import { NgArrayPipesModule } from 'ngx-pipes'
import { SafePipeModule } from 'safe-pipe'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { CallingCodesModalComponent } from './calling-codes-modal/calling-codes-modal.component'
import { CareModalComponent } from './care-modal/care-modal.component'
import { CurrencyModalComponent } from './currency-modal/currency-modal.component'
import { FuelModalComponent } from './fuel-modal/fuel-modal.component'
import { LanguagePipe } from './language/language.pipe'
import { TestModalComponent } from './test-modal/test-modal.component'
import { UtilPipe } from './util/util.pipe'
import { VehicleMoreOptionsModalComponent } from './vehicle-more-options-modal/vehicle-more-options-modal.component'
import { WashModalComponent } from './wash-modal/wash-modal.component'

const
  entryComponents = [
    FuelModalComponent,
    CareModalComponent,
    TestModalComponent,
    WashModalComponent,
    CallingCodesModalComponent,
    CurrencyModalComponent,
    VehicleMoreOptionsModalComponent
  ],
  components = [
    LanguagePipe,
    UtilPipe,
    ...entryComponents
  ],
  imports = [
    FormsModule,
    ReactiveFormsModule,
    NgArrayPipesModule,
    SafePipeModule
  ]

@NgModule({
  declarations: [...components],
  entryComponents: [...entryComponents],
  imports: [CommonModule, IonicModule, ...imports],
  exports: [...components, ...imports]
})
export class AppSharedModule { }
