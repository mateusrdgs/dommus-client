import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';

import { User } from './../classes/user';

@Injectable()
export class UsersResolver implements Resolve<User> {

  constructor(
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const url = this._urlCreatorService.createUrl('users', 'get');
    return this._remoteService
               .getResources(url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }

}
