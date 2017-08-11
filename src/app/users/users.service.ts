import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from './../shared/services/local-storage.service';

import { User } from './user';
import { url } from './../database';

@Injectable()
export class UsersService {

  private _idAccount: string;
  private _headers: Headers;

  constructor(
    private _http: Http,
    private _localStorageService: LocalStorageService
  ) {
    this.getIdAccount();
    this._headers = this.createHeaders();
  }

  getUsers(): Promise<User[]> {
    const _url = this.mount_Url('GETALL', url, this._idAccount);
    const { token } = JSON.parse(this._localStorageService.getToken('dommusRemote'));
    this.createAuthorizationHeader(this._headers, token);
    const options = this.createOptions(this._headers);
    return this._http.get(_url,  options)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getUserById(idUser: string): Promise<User> {
    const _url = this.mount_Url('BYID', url, this._idAccount);
    return this._http.get(_url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  createUser(user: User): Promise<User> {
    const _url = this.mount_Url('CREATE', url, this._idAccount);
    return this._http.post(_url, user)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    const { Id } = user, _url = this.mount_Url('BYID', url, this._idAccount, Id);
    return this._http.put(url, user)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  deleteUser(idUser: string): Promise<string> {
    const _url = this.mount_Url('BYID', url, this._idAccount, idUser);
    return this._http.delete(url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getIdAccount() {
    this._idAccount = this._localStorageService.getIdAccount();
  }

  createHeaders(): Headers {
    return new Headers();
  }

  createAuthorizationHeader(header: Headers, token: string) {
    header.append('Authorization', `Bearer ${token}`);
  }

  createOptions(headers: Headers) {
    return new RequestOptions({ headers });
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
