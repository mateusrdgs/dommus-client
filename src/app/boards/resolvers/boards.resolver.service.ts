import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve  } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Board } from './../board';
import { BoardsService } from './../services/boards.service';

@Injectable()
export class BoardsResolver implements Resolve<Board[]> {

  constructor(
    private _boardsService: BoardsService
  ) {
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Board[]> | Promise<Board[]> | Board[] {
    const { idResidence } = route.params;
    return this._boardsService.getBoards(idResidence);
  }
}
