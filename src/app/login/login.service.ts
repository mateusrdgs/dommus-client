import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { url } from './../database';

import { Account } from './new-account/account';

@Injectable()
export class LoginService {

  constructor(
    private _http: Http
  ) { }

  createNewAccount(account: Account) {
    const _url = this.mount_Url('CREATE', url);
    this._http.post(_url, account)
              .toPromise()
              .then(response => this.saveToken(response['_body']))
              .catch(this.handleError);
  }

  loginAccount(account: Account) {
    const _url = this.mount_Url('LOGIN', url);
    this._http.post(_url, account)
              .toPromise()
              .then(response => {
                console.log(response);
                this.saveToken(response['_body']);
                return response;
              })
              .catch(this.handleError);
  }

  logoutAccount() {
    window.localStorage.removeItem('dommus-token');
  }

  saveToken(token: string) {
    window.localStorage['dommus-token'] = token;
  }

  getToken() {
    return window.localStorage.getItem('dommus-token');
  }

  isLoggedIn() {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.expiration > (Date.now() / 1000);
    }
  }

  /*currentUser() {

  }*/

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
