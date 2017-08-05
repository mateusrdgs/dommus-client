import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { User } from './../user';
import { UsersService } from './../users.service';

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(
    private _usersService: UsersService
  ) {

  }

  resolve(
    _router: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const id = _router.params['id'];
    return this._usersService.getUserById(id);
  }
}
