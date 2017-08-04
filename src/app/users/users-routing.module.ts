import { NgModule } from '@angular/core';
import { Routes, RouterModule, Resolve } from '@angular/router';

import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersResolver } from './resolvers/users.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: {
      users: UsersResolver
    },
    children: []
  },
  {
    path: 'new-user',
    component: NewUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
