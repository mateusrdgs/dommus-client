import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';

@Injectable()
export class NewComponentGuard implements CanActivate {

  constructor(
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | any {
    const url = this._urlCreatorService.createUrl('boards', 'get', route.params);
    return this._remoteService
               .getResources(url)
               .map(response => {
                 if (response.hasOwnProperty('status') && response.status === 200) {
                  return !!response.json()['Boards'].length;
                 } else {
                   return false;
                 }
               });
  }
}
