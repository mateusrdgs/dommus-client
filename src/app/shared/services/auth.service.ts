import { Injectable } from '@angular/core';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';

import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  getToken(tokenName: string) {
    return this._localStorageService.getToken(tokenName);
  }

  getTokenValue(tokenName: string, tokenValue) {
    const token = this.getToken(tokenName);
    try {
      return JSON.parse(token)['token'];
    } catch (error) {
        console.error(error);
      return '';
    }
  }

  saveToken(tokenName: string, value: string) {
    this._localStorageService.saveToken(tokenName, value);
  }

  logoutAccount(tokenName: string) {
    this._localStorageService.removeToken(tokenName);
  }

  isLoggedIn(tokenName: string) {
    const token = this._localStorageService.getToken(tokenName);
    if (token.length) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.expiration > (Date.now() / 1000);
    }
  }

  getDataFromToken(property: string) {
    const token = this.getToken('dommusRemote');
    if (token.length) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload[property];
    }
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
