import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RoomsService } from './../services/rooms.service';
import Room from './../classes/room';

import { RemoteService } from './../../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';

@Injectable()
export class RoomsResolver implements Resolve<Room[]> {

  constructor(
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room[]> | Promise<Room[]> | Room[] {

    const { idResidence } = route.params,
          _url = this._urlCreatorService.createUrl('rooms', 'get', { idResidence });
    return this._remoteService
               .getResources(_url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }
}
