import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ResidencesService } from './../services/residences.service';
import Residence from './../classes/residence';

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
    const { idResidence } = route.params;
    return this._residencesService.getResidenceById(idResidence);
  }
}
