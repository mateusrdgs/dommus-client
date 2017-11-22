import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';

import { LocalStorageService } from './../local-storage/local-storage.service';

@Injectable()
export class AuthService {

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  isLoggedIn(tokenName: string) {
    const token = this._localStorageService.getToken(tokenName);
    if (token.length) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.expiration > (Date.now() / 1000);
    }
  }

  checkUserPermission(tokenName: string) {
    return  this._localStorageService.getTokenPropertyValue(tokenName, 'isAdmin', false) === 'true';
  }

  logoutAccount(tokenName: string) {
    this._localStorageService.removeToken(tokenName);
  }

  createRequestHeaders(): Headers {
    return new Headers();
  }

  createAuthorizationHeader(header: Headers, token: string) {
    header.append('Authorization', `Bearer ${token}`);
  }

  createRequestOptions(headers: Headers) {
    return new RequestOptions({ headers });
  }

}
