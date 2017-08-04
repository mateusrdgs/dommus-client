import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Account } from './account';

@Injectable()
export class NewAccountService {

  databaseURI = 'http://localhost:3000/api/account';
  headers: Headers = new Headers();

  constructor(private _http: Http) { }

  getAccount(): Promise<Account[]> {
    return this._http.get(this.databaseURI)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  postAccount(data: Account): Promise<any> {

    return this._http.post(this.databaseURI, JSON.stringify(data))
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleError(error): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
