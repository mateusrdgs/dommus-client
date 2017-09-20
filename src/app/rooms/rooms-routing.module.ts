import { RoomsComponent } from './rooms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsResolver } from './resolvers/rooms.resolver.service';
import { RoomResolver } from './resolvers/room.resolver.service';
import { NewRoomComponent } from './new-room/new-room.component';
import { RoomComponent } from './room/room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    resolve: {
      rooms: RoomsResolver
    },
    data: {
      title: 'Rooms'
    }
  },
  {
    path: 'new',
    component: NewRoomComponent,
    data: {
      title: 'New room'
    }
  },
  {
    path: ':idRoom',
    component: RoomComponent,
    resolve: {
      room: RoomResolver
    },
    data: {
      title: 'Room'
    }
  },
  {
    path: ':idRoom/update',
    component: UpdateRoomComponent,
    resolve: {
      room: RoomResolver
    },
    data: {
      title: 'Update room'
    }
  },
  {
    path: ':idRoom/components',
    loadChildren: 'app/components/components.module#ComponentsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
