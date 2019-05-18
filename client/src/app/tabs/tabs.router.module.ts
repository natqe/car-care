import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'main', children: [{ path: '', loadChildren: '../main/main.module#MainPageModule' }] },
      { path: 'archive', children: [{ path: '', loadChildren: '../archive/archive.module#ArchivePageModule' }] },
      { path: 'profile', children: [{ path: '', loadChildren: '../profile/profile.module#ProfilePageModule' }] },
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
