import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UsersService } from './../services/users.service';

import { User } from './../user';

@Injectable()
export class UsersResolver implements Resolve<User> {

  constructor(
    private _userService: UsersService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this._userService.getUsers();
  }

}
