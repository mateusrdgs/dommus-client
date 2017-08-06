import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Room } from './../room';
import { RoomsService } from './../rooms.service';

@Injectable()
export class RoomResolver implements Resolve<any> {

  constructor(
    private _roomsService: RoomsService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const { idResidence, idRoom } = route.params;
    return this._roomsService.getRoomById(idResidence, idRoom);
  }
}
