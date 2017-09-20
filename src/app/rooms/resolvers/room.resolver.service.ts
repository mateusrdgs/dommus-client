import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RoomsService } from './../services/rooms.service';
import Room from './../classes/room';

@Injectable()
export class RoomResolver implements Resolve<Room> {

  constructor(
    private _roomsService: RoomsService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room> | Promise<Room> | Room {
    const { idResidence, idRoom } = route.params;
    return this._roomsService.getRoomById(idResidence, idRoom);
  }
}
