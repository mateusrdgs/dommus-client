import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersModule } from './users/users.module';
import { RoomModule } from './room/room.module';
import { ResidenceModule } from './residence/residence.module';
import { ComponentModule } from './component/component.module';
import { BoardModule } from './board/board.module';
import { ProfileModule } from './profile/profile.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: 'app/profile/profile.module#ProfileModule',
  },
  {
    path: 'residences',
    loadChildren: 'app/residence/residence.module#ResidenceModule',
  },
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule'
  },
  {
    path: 'rooms',
    loadChildren: 'app/room/room.module#RoomModule'
  },
  {
    path: 'components',
    loadChildren: 'app/component/component.module#ComponentModule'
  },
  {
    path: 'boards',
    loadChildren: 'app/board/board.module#BoardModule'
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
