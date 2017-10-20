import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { NewAccountComponent } from './new-account/new-account.component';

import { UsersComponent } from './users/components/users/users.component';

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
    resolve: {
      users: UsersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
