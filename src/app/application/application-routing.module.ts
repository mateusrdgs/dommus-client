import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGuard } from './../shared/guards/app.guards.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/application/home/home.module#HomeModule',
    canActivate: [AppGuard],
    canLoad: [AppGuard],
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
