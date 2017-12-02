import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { AuthService } from './../services/auth/auth.service';

import { UserEmitter } from './../emitters/user.emitter';

@Injectable()
export class DashboardGuard implements CanActivate, CanLoad {

  constructor(
    private _authService: AuthService,
    private _userEmitter: UserEmitter,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.checkUserPermission('Dommus_User')) {
        if (this._authService.checkAdminPasswordCorrect('Dommus_User')) {
          return true;
        }
        return Observable.create(observer => {
                this._userEmitter
                    .userCanEnter
                    .subscribe(canEnter => {
                      observer.next(canEnter);
                    });
               });
      } else {
        return true;
      }
  }

  canLoad(
    route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.checkUserPermission('Dommus_User')) {
        return Observable.create(observer => {
                this._userEmitter
                    .userCanEnter
                    .subscribe(canEnter => {
                      observer.next(canEnter);
                    });
                    observer.next(false);
               });
      } else {
        return true;
      }
  }
}
