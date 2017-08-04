import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
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
export class UserRoutingModule { }
