import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGuard } from './shared/guards/app.guards.service';
import { UserGuard } from './shared/guards/user.guard';

import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: ':idUser',
    loadChildren: 'app/application/application.module#ApplicationModule',
    canActivate: [AppGuard, UserGuard],
    canLoad: [AppGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: '**',
    redirectTo: 'login/users',
    canActivate: [AppGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
