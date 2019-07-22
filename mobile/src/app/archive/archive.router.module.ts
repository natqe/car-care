import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArchivePage } from './archive.page'

const routes: Routes = [
  {
    path: '',
    component: ArchivePage,
    children: [
      {
        path: 'care',
        async loadChildren() {
          const { CarePageModule } = await import(`../care/care.module`)
          return CarePageModule
        }
      },
      {
        path: 'fuel',
        async loadChildren() {
          const { FuelPageModule } = await import(`../fuel/fuel.module`)
          return FuelPageModule
        }
      },
      {
        path: 'test',
        async loadChildren() {
          const { TestPageModule } = await import(`../test/test.module`)
          return TestPageModule
        }
      },
      {
        path: 'wash',
        async loadChildren() {
          const { WashPageModule } = await import(`../wash/wash.module`)
          return WashPageModule
        }
      },
      {
        path: '',
        redirectTo: 'care',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'care',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArchivePageRoutingModule { }
