import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user';

@Injectable()
export class UsersService {

  private _id = '5984a2f632c9f33c0a3df156';
  private _url = `http://localhost:3000/api/account/${this._id}/users`;

  constructor(
    private _http: Http
  ) { }

  getUsers(): Promise<User[]> {
    return this._http.get(this._url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getUserById(id: string): Promise<User> {
    const url = this._url.concat(id);
    return this._http.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  createUser(user: User): Promise<User> {
    const url = this._url.concat('/new');
    return this._http.post(url, user)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    const id = user.Id, url = this._url.concat(id);
    return this._http.put(url, user)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  deleteUser(id: string): Promise<string> {
    const url = this._url.concat(id);
    return this._http.delete(url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleError(error): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
