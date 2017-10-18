import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LocalStorageService } from './../../../shared/services/local-storage/local-storage.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';

import Residence from './../classes/residence';

@Injectable()
export class ResidencesResolver implements Resolve<Residence> {

  constructor(
    private _localStorageService: LocalStorageService,
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const _url = this._urlCreatorService.createUrl('residences', 'get');
    return this._remoteService
               .getResources(_url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }
}
