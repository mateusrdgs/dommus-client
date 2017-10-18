import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { RoomsService } from './services/rooms.service';
import { RoomsResolver } from './resolvers/rooms.resolver.service';
import { RoomResolver } from './resolvers/room.resolver.service';

import { RoomsComponent } from './components/rooms/rooms.component';
import { NewRoomComponent } from './components/new-room/new-room.component';
import { RoomComponent } from './components/room/room.component';
import { UpdateRoomComponent } from './components/update-room/update-room.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RoomsRoutingModule,
    SharedModule
  ],
  declarations: [
    RoomsComponent,
    NewRoomComponent,
    RoomComponent,
    UpdateRoomComponent
  ],
  providers: [
    RoomsService,
    RoomsResolver,
    RoomResolver
  ]
})
export class RoomsModule { }
