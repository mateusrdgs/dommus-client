import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './../shared/services/auth/auth.service';

import { LocalStorageService } from './../shared/services/local-storage/local-storage.service';

import { User } from './user';
import { url } from './../database';

@Injectable()
export class UsersService {

  private _headers: Headers;
  private _idAccount: string;
  private _options: object;
  private _token: string;

  constructor (
    private _authService: AuthService,
    private _http: Http,
    private _localStorageService: LocalStorageService
  ) {
    this.startServiceOptions();
  }

  startServiceOptions() {
    this._headers = this._authService.createRequestHeaders();
    this._idAccount = this._localStorageService.getTokenPropertyValue('Dommus', '_id', true);
    this._token = this._localStorageService.getTokenValue('Dommus');
    this._authService.createAuthorizationHeader(this._headers, this._token);
    this._options = this._authService.createRequestOptions(this._headers);
  }

  getUsers(): Promise<User[]> {
    const _url = this.mount_Url('GETALL', url, this._idAccount);
    const options = this._authService.createRequestOptions(this._headers);
    return this._http.get(_url, options)
               .toPromise()
               .then(response => response.json().Users)
               .catch(this.handleError);
  }

  getUserById(idUser: string): Promise<User> {
    const _url = this.mount_Url('BYID', url, this._idAccount, idUser);
    const options = this._authService.createRequestOptions(this._headers);
    return this._http.get(_url, options)
               .toPromise()
               .then(response => response.json().User)
               .catch(this.handleError);
  }

  createUser(user: User): Promise<User> {
    const _url = this.mount_Url('CREATE', url, this._idAccount);
    const options = this._authService.createRequestOptions(this._headers);
    return this._http.post(_url, user, options)
               .toPromise()
               .then(response => response.json().User)
               .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    const { Id } = user, _url = this.mount_Url('BYID', url, this._idAccount, Id);
    const options = this._authService.createRequestOptions(this._headers);
    return this._http.put(url, user, options)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  deleteUser(idUser: string): Promise<string> {
    const _url = this.mount_Url('BYID', url, this._idAccount, idUser);
    const options = this._authService.createRequestOptions(this._headers);
    return this._http.delete(url, options)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleError(error): Promise<any> {
    return Promise.reject(error['_body'] || error.message || error)
                  .catch(err => console.error(err));
  }

  mount_Url(type: string, _url: string, idAccount: string, idUser?: string) {
    switch (type) {
      case 'CREATE':
        return `${_url}/${idAccount}/users/new`;
      case 'GETALL':
        return `${_url}/${idAccount}/users`;
      case 'BYID':
        return `${_url}/${idAccount}/users/${idUser}`;
    }
  }

}
