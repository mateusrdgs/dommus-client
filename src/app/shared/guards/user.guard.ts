import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,  CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from './../services/local-storage/local-storage.service';
import { RemoteService } from './../services/remote/remote.service';
import { UrlCreatorService } from './../services/url-creator/url-creator.service';

import { User } from './../../application/users/classes/user';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private _localStorageService: LocalStorageService,
    private _urlCreatorService: UrlCreatorService,
    private _remoteService: RemoteService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url = this._urlCreatorService.createUrl('users', 'id', route.params);
    return this._remoteService
               .getResources(url)
               .map(response => {
                  if (response.hasOwnProperty('status') && response.status === 200) {
                    const usr = response.json()['User'],
                          user = this.createNewUser(usr);
                    this._localStorageService
                        .encodeAndSaveToken('Dommus_User', JSON.stringify(user));
                    return true;
                  }
                  this._router.navigate(['login', 'users']);
                  return false;
               })
               .catch(error => Observable.of(error));
  }

  createNewUser(user: any): User {
    const { name, _id, isAdmin } = user;
    return new User(name, isAdmin, _id);
  }
}
