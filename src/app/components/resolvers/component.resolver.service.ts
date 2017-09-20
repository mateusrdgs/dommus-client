import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ComponentsService } from './../services/components.service';

@Injectable()
export class ComponentResolver implements Resolve<any> {

  constructor(
    private _componentsService: ComponentsService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const { idResidence, idRoom, idComponent } = route.params;
    return this._componentsService.getComponentById(idResidence, idRoom, idComponent);
  }
}
