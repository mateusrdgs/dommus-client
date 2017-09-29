import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ComponentsService } from './../services/components.service';

import { UrlCreatorService } from './../../shared/services/url-creator/url-creator.service';
import { RemoteService } from './../../shared/services/remote/remote.service';

@Injectable()
export class ComponentResolver implements Resolve<any> {

  constructor(
    private _componentsService: ComponentsService,
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const url = this._urlCreatorService.createUrl('components', 'id', route.params);
    return this._remoteService.getResources(url)
                              .map(response => response)
                              .catch(error => Observable.of(error));
  }
}
