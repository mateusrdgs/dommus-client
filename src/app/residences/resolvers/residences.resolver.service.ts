import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Residence } from './../residence';
import { ResidencesService } from './../residences.service';

@Injectable()
export class ResidencesResolver implements Resolve<Residence> {

  constructor(
    private _residencesService: ResidencesService
  ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this._residencesService.getResidences();
  }

  /*resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Residence[]> | Promise<Residence[]> | Residence[] {
    return this._residencesService.getResidences()
               .then(residences => {
                 return residences.map(residence => {
                   const { _id, description, url, boards, rooms } = residence;
                   return new Residence(description, url, _id, rooms, boards);
                 });
               });
  }*/
}
