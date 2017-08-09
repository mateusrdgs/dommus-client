import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from './../shared/services/local-storage.service';
import { url } from './../database';
import { Account } from './new-account/account';

@Injectable()
export class LoginService {

  constructor(
    private _http: Http,
    private _localStorageService: LocalStorageService
  ) { }

  createNewAccount(account: Account) {
    const _url = this.mount_Url('CREATE', url);
    this._http.post(_url, account)
              .toPromise()
              .then(response => this._localStorageService.saveToken('dommusRemote', response['_body']))
              .catch(this.handleError);
  }

  loginAccount(account: Account) {
    const _url = this.mount_Url('LOGIN', url);
    this._http.post(_url, account)
              .toPromise()
              .then(response => this._localStorageService.saveToken('dommusRemote', response['_body']))
              .catch(this.handleError);
  }

  logoutAccount() {
    this._localStorageService.removeToken('dommusRemote');
  }

  getToken() {
    this._localStorageService.getToken('dommusRemote');
  }

  isLoggedIn() {
    const token = this._localStorageService.getToken('dommusRemote');
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.expiration > (Date.now() / 1000);
    }
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
  }

  mount_Url(type: string, _url: string) {
    switch (type) {
      case 'CREATE':
        return `${_url}/new`;
      case 'LOGIN':
        return `${_url}/login`;
    }
  }

}
