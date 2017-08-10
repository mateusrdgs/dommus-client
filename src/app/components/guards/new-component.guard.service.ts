import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { BoardsService } from './../../boards/boards.service';

@Injectable()
export default class NewComponentGuard implements CanActivate {

  constructor(
    private _boardsService: BoardsService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {

    const { idResidence } = route.params;
    return this.hasBoards(idResidence);
  }

  hasBoards(idResidence: string) {
    return this._boardsService.getBoards(idResidence).then(response => response.length);
  }
}
