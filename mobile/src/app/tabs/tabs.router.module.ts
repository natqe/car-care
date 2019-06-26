import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'main', loadChildren: '../main/main.module#MainPageModule'  },
      { path: 'archive', loadChildren: '../archive/archive.module#ArchivePageModule' },
      { path: 'person', loadChildren: '../person/person.module#PersonPageModule' },
      { path: 'vehicles', loadChildren: '../vehicles/vehicles.module#VehiclesPageModule' },
      { path: '', redirectTo: '/tabs/main', pathMatch: 'full' }
    ]
  },
  { path: 'vehicle/:id', loadChildren: '../vehicle/vehicle.module#VehiclePageModule' },
  { path: 'vehicle', loadChildren: '../vehicle/vehicle.module#VehiclePageModule' },
  { path: '', redirectTo: '/tabs/main', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
