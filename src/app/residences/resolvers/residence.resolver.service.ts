import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Residence } from './../residence';
import { ResidencesService } from './../residences.service';

@Injectable()
export class ResidenceResolver implements Resolve<Residence> {

  constructor(
    private _residencesService: ResidencesService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable <any> | Promise <any> | any {
    const id = route.params['id'];
    return this._residencesService.getResidenceById(id);
  }
}
