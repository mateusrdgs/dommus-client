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
    private _remoteService: RemoteService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    /*const id = this._localStorageService.getTokenPropertyValue('Dommus', '_id', true);
    const url = this._localStorageService.getTokenPropertyValue('currentResidence', 'url', false);
    const _url = `${url}/api/account/${id}/residences`;
    console.log(_url);*/
    const url = `http://localhost:3000/api/account/599583e8b92e392ce8653f5d/residences/`;
    return this._remoteService.getResources(url);
  }
}
