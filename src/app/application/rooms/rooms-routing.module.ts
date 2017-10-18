import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsResolver } from './resolvers/rooms.resolver.service';
import { RoomResolver } from './resolvers/room.resolver.service';

import { RoomsComponent } from './components/rooms/rooms.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { RoomComponent } from './components/room/room.component';
import { UpdateRoomComponent } from './components/update-room/update-room.component';

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
    loadChildren: 'app/application/components/components.module#ComponentsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
