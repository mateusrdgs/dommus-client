import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './../services/auth/auth.service';

@Injectable()
export class AppGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.isLoggedIn('Dommus')) {
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;
      }
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.isLoggedIn('Dommus')) {
        return true;
      } else {
        this._router.navigate(['/login']);
        return false;
      }
  }
}
