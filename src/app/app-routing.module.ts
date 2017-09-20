import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersModule } from './users/users.module';
import { ResidencesModule } from './residences/residences.module';
import { ProfileModule } from './profile/profile.module';

import { AppGuard } from './shared/guards/app.guards.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/home/home.module#HomeModule',
    canActivate: [AppGuard],
    canLoad: [AppGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
    canActivate: [AppGuard],
    canLoad: [AppGuard]
  },
  {
    path: 'residences',
    loadChildren: 'app/residences/residences.module#ResidencesModule',
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
    redirectTo: '/dashboard',
    pathMatch: 'full'
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
