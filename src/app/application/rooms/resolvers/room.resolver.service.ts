import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';

//import { RoomsService } from './../services/rooms.service';
import Room from './../classes/room';

@Injectable()
export class RoomResolver implements Resolve<Room> {

  constructor(
    private _urlCreatorService: UrlCreatorService,
    private _remoteService: RemoteService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room> | Promise<Room> | Room {
    const { idResidence, idRoom } = route.params,
          _url = this._urlCreatorService.createUrl('rooms', 'id', route.params);
    return this._remoteService
               .getResources(_url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }
}
