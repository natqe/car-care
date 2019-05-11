import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'vehicle/:id', loadChildren: './vehicle/vehicle.module#VehiclePageModule' },
  { path: 'vehicle', loadChildren: './vehicle/vehicle.module#VehiclePageModule' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
