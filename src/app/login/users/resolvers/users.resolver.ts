import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { RemoteService } from './../../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';

import { User } from './../../../application/users/classes/user';

@Injectable()
export class UsersResolver implements Resolve<User[]> {

  constructor(
    private _urlCreatorService: UrlCreatorService,
    private _remoteService: RemoteService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> | Promise<User[]> | User[] {
    const url = this._urlCreatorService.createUrl('users', 'get');
    return this._remoteService
               .getResources(url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }
}
