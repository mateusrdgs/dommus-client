import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { LoginService } from './../../login/login.service';

@Injectable()
export class AppGuard implements CanActivate {

  constructor(
    private _loginService: LoginService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this._loginService.isLoggedIn();
  }
}
