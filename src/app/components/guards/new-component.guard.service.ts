import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { BoardsService } from './../../boards/boards.service';

@Injectable()
export class NewComponentGuard implements CanActivate {

  constructor(

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return true;
  }
}
