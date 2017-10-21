import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGuard } from './../shared/guards/app.guards.service';

import { NotFoundComponent } from './../shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/application/home/home.module#HomeModule',
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'Not found'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
