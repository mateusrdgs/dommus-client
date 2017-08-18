import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './../shared/services/auth.service';
import { Room } from './room';

import { url } from './../database';

@Injectable()
export class RoomsService {

  private _headers: Headers;
  private _idAccount: string;
  private _options: object;
  private _token: string;

  constructor(
    private _http: Http,
    private _authService: AuthService
  ) {
    this.startServiceOptions();
  }

  startServiceOptions() {
    this._headers = this._authService.createRequestHeaders();
    this._idAccount = this._authService.getDataFromToken('_id');
    this._token = this._authService.getTokenValue('dommusRemote', 'token');
    this._authService.createAuthorizationHeader(this._headers, this._token);
    this._options = this._authService.createRequestOptions(this._headers);
  }

  getRooms(idResidence: string) {
    const _url = this.mountUrl('GETALL', url, this._idAccount, idResidence);
    return this._http.get(_url, this._options)
                     .toPromise()
                     .then(response => response.json().Rooms)
                     .catch(this.handleError);
  }

  getRoomById(idResidence: string, idRoom: string) {
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idRoom);
    return this._http.get(_url, this._options)
                     .toPromise()
                     .then(response => response.json().Room)
                     .catch(this.handleError);
  }

  createRoom(idResidence: string, description: string) {
    const _url = this.mountUrl('CREATE', url, this._idAccount, idResidence);
    return this._http.post(_url, { description }, this._options)
                     .toPromise()
                     .then(response => response.json().Room)
                     .catch(this.handleError);
  }

  updateRoom(idResidence: string, room: Room) {
    const idRoom  = room.Id;
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idRoom);
    return this._http.put(_url, room, this._options)
                     .toPromise()
                     .then(response => response.json().Room)
                     .catch(this.handleError);
  }

  deleteRoom(idResidence: string, idRoom: string) {
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idRoom);
    return this._http.delete(_url, this._options)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error['_body'] || error.message || error)
                  .catch(err => {
                    console.error(err);
                  });
  }

  mountUrl(type, url, idAccount, idResidence, idRoom?: string) {
    switch (type) {
      case 'CREATE':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/new`;
      case 'GETALL':
        return `${url}/${idAccount}/residences/${idResidence}/rooms`;
      case 'BYID':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/${idRoom}`;
    }
  }

}
