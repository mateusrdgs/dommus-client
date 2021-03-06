import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { NewAccountComponent } from './new-account/new-account.component';

import { UsersComponent } from './users/components/users/users.component';
import { NewUserComponent } from './users/components/new-user/new-user.component';

import { AppGuard } from './../shared/guards/app.guards.service';
import { UsersResolver } from './users/resolvers/users.resolver';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'new-account',
    component: NewAccountComponent,
    data: {
      title: 'Create account'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AppGuard],
    data: {
      title: 'Users'
    },
    resolve: {
      users: UsersResolver
    }
  },
  {
    path: 'users/new',
    canActivate: [AppGuard],
    component: NewUserComponent,
    data: {
      title: 'New user'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
