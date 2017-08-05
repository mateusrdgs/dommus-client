import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsService } from './rooms.service';
import { RoomsComponent } from './rooms.component';
import { NewRoomComponent } from './new-room/new-room.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    RoomsRoutingModule
  ],
  declarations: [RoomsComponent, NewRoomComponent],
  providers: [
    RoomsService
  ]
})
export class RoomsModule { }
