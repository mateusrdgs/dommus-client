import { UrlCreatorService } from './../../shared/services/url-creator/url-creator.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from './../../shared/services/local-storage/local-storage.service';
import { RemoteService } from './../../shared/services/remote/remote.service';

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
    console.log(this._urlCreatorService.createResidenceUrl());
    const id = this._localStorageService.getTokenPropertyValue('Dommus', '_id', true);
    const _url = `http://localhost:3000/api/account/${id}/residences`;
    return this._remoteService.getResources(_url);
  }
}
