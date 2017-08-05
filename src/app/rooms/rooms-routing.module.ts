import { RoomsComponent } from './rooms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRoomComponent } from './new-room/new-room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent
  },
  {
    path: 'new',
    component: NewRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
