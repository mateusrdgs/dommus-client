import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve  } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import Board from './../classes/board';

import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';

@Injectable()
export class BoardsResolver implements Resolve<Board[]> {

  constructor(
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Board[]> | Promise<Board[]> | Board[] {
    const { idResidence } = route.params,
          url = this._urlCreatorService.createUrl('boards', 'get', { idResidence });
    return this._remoteService
               .getResources(url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }
}
