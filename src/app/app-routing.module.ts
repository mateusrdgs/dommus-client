import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersModule } from './users/users.module';
import { ResidencesModule } from './residences/residences.module';
import { ProfileModule } from './profile/profile.module';

import { AppGuard } from './shared/guards/app.guards.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule'
  },
  {
    path: 'residences',
    loadChildren: 'app/residences/residences.module#ResidencesModule',
  },
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
