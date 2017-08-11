import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './../shared/services/auth.service';
import { url } from './../database';
import { Account } from './new-account/account';

@Injectable()
export class LoginService {

  constructor(
    private _http: Http,
    private _authService: AuthService
  ) { }

  createNewAccount(account: Account) {
    const _url = this.mount_Url('CREATE', url);
    this._http.post(_url, account)
              .toPromise()
              .then(response => this._authService.saveToken('dommusRemote', response['_body']))
              .catch(this.handleError);
  }

  loginAccount(account: Account) {
    const _url = this.mount_Url('LOGIN', url);
    this._http.post(_url, account)
              .toPromise()
              .then(response => this._authService.saveToken('dommusRemote', response['_body']))
              .catch(this.handleError);
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error['_body'] || error.message || error)
                  .catch(err => {
                    console.error(err);
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
