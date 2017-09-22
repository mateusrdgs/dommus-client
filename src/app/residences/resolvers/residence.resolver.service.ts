import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from './../../shared/services/local-storage/local-storage.service';
import { RemoteService } from './../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../shared/services/url-creator/url-creator.service';

import Residence from './../classes/residence';

@Injectable()
export class ResidenceResolver implements Resolve<Residence> {

  constructor(
    private _localStorageService: LocalStorageService,
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable <any> | Promise <any> | any {
    const idResidence = this._localStorageService.getTokenPropertyValue('currentResidence', 'id', false),
          _url = this._urlCreatorService.createUrl('residences', 'id', { idResidence: idResidence });
    return this._remoteService.getResources(_url);
  }
}
