import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGuard } from './shared/guards/app.guards.service';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: 'app/application/application.module#ApplicationModule',
    canActivate: [AppGuard],
    canLoad: [AppGuard],
    data: {
      title: 'Dashboard'
    }
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
