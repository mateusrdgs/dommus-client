import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RemoteService } from './../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../shared/services/url-creator/url-creator.service';

import { User } from './../classes/user';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) {

  }

  resolve(
    _router: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const { idUser } = _router.params,
          url = this._urlCreatorService.createUrl('users', 'id', { idUser });
    return this._remoteService.getResources(url);
  }
}
