import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArchivePage } from './archive.page'

const routes: Routes = [
  {
    path: '',
    component: ArchivePage,
    children: [
      { path: 'care', loadChildren: '../care/care.module#CarePageModule' },
      { path: 'fuel', loadChildren: '../fuel/fuel.module#FuelPageModule' },
      { path: 'test', loadChildren: '../test/test.module#TestPageModule' },
      { path: 'wash', loadChildren: '../wash/wash.module#WashPageModule' },
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
