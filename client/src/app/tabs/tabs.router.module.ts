import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TabsPage } from './tabs.page'

const routes: Routes = [
  { 
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'main',
        async loadChildren() {

          const { MainPageModule } = await import(`../main/main.module`)

          return MainPageModule

        }
      },
      {
        path: 'archive',
        async loadChildren() {

          const { ArchivePageModule } = await import(`../archive/archive.module`)

          return ArchivePageModule

        }
      },
      {
        path: 'person',
        async loadChildren() {

          const { PersonPageModule } = await import(`../person/person.module`)

          return PersonPageModule

        }
      },
      {
        path: 'vehicles',
        async loadChildren() {

          const { VehiclesPageModule } = await import(`../vehicles/vehicles.module`)

          return VehiclesPageModule

        }
      },
      { path: '', redirectTo: '/tabs/main', pathMatch: 'full' }
    ]
  },
  {
    path: 'vehicle/:id',
    async loadChildren() {

      const { VehiclePageModule } = await import(`../vehicle/vehicle.module`)

      return VehiclePageModule

    }
  },
  {
    path: 'vehicle',
    async loadChildren() {

      const { VehiclePageModule } = await import(`../vehicle/vehicle.module`)

      return VehiclePageModule

    }
  },
  { path: '', redirectTo: '/tabs/main', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
