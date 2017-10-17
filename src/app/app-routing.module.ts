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
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule',
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule',
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
