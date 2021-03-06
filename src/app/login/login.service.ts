import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from './../shared/services/local-storage/local-storage.service';
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
    return this._http.post(_url, account)
              .toPromise()
              .then(response => {
                if (response['status'] === 200) {
                  this._localStorageService.saveToken('Dommus_Token', response['_body']);
                  return true;
                }
              })
              .catch(this.handleError);
  }

  loginAccount(account: Account) {
    const _url = this.mount_Url('LOGIN', 'http://localhost:3000/api/account');
    return this._http.post(_url, account)
              .toPromise()
              .then(response => {
                if (response['status'] === 200) {
                  this._localStorageService.saveToken('Dommus_Token', response['_body']);
                  return true;
                }
              })
              .catch(this.handleError);
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error['_body'] || error.message || error)
                  .catch(err => {
                    alert(err);
                  });
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
