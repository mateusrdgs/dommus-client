import { UpdateUserComponent } from './components/update-user/update-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';

import { UsersResolver } from './resolvers/users.resolver.service';
import { UserResolver } from './resolvers/user.resolver.service';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { NewUserComponent } from './components/new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      users: UsersResolver
    },
    data: {
      title: 'Users'
    }
  },
  {
    path: 'new',
    component: NewUserComponent,
    data: {
      title: 'New user'
    }
  },
  {
    path: ':idUser',
    component: UserComponent,
    resolve: {
      user: UserResolver
    },
    data: {
      title: 'User'
    }
  },
  {
    path: ':idUser/update',
    component: UpdateUserComponent,
    resolve: {
      user: UserResolver
    },
    data: {
      title: 'Update user'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
