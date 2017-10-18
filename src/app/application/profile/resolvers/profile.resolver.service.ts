import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from './../../../shared/services/local-storage/local-storage.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';
import { UrlCreatorService } from '../../../shared/services/url-creator/url-creator.service';

import Profile from '../classes/profile';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {

  constructor(
    private _localStorageService: LocalStorageService,
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Profile> | Promise<Profile> | Profile {

    const idAccount = this._localStorageService.getTokenPropertyValue('Dommus', '_id', true),
          url = this._urlCreatorService.createUrl('account', 'id', { idAccount });
    return this._remoteService
               .getResources(url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }

}
