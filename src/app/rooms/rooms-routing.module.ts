import { RoomsComponent } from './rooms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsResolver } from './resolvers/rooms.resolver.service';
import { RoomResolver } from './resolvers/room.resolver.service';
import { NewRoomComponent } from './new-room/new-room.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    resolve: {
      rooms: RoomsResolver
    }
  },
  {
    path: 'new',
    component: NewRoomComponent
  },
  {
    path: ':idRoom',
    component: RoomComponent,
    resolve: {
      room: RoomResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
