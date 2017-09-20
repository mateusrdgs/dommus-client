import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';

import { UsersResolver } from './resolvers/users.resolver.service';
import { UserResolver } from './resolvers/user.resolver.service';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './new-user/new-user.component';

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
    path: ':id',
    component: UserComponent,
    resolve: {
      user: UserResolver
    },
    data: {
      title: 'User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
