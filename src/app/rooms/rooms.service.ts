import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/toPromise';

import { LoginService } from './../login/login.service';
import { Room } from './room';
import { url } from './../database';

@Injectable()
export class RoomsService {

  private _idAccount: string;
  private _url = url;

  constructor(
    private _http: Http,
    private _loginService: LoginService
  ) {
    this.getIdAccount();
  }

  getRooms(idResidence: string) {
    const url = this.mountUrl('GETALL', this._url, this._idAccount, idResidence);
    return this._http.get(url)
                     .toPromise()
                     .then(response => response.json().Rooms)
                     .catch(this.handleError);
  }

  getRoomById(idResidence: string, idRoom: string) {
    const url = this.mountUrl('BYID', this._url, this._idAccount, idResidence, idRoom);
    return this._http.get(url)
                     .toPromise()
                     .then(response => response.json().Room)
                     .catch(this.handleError);
  }

  createRoom(idResidence: string, description: string) {
    const url = this.mountUrl('CREATE', this._url, this._idAccount, idResidence);
    return this._http.post(url, { description })
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  updateRoom(idResidence: string, room: Room) {
    const idRoom  = room.Id;
    const url = this.mountUrl('BYID', this._url, this._idAccount, idResidence, idRoom);
    return this._http.put(url, room)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  deleteRoom(idResidence: string, idRoom: string) {
    const url = this.mountUrl('BYID', this._url, this._idAccount, idResidence, idRoom);
    return this._http.delete(url)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  getIdAccount() {
    this._idAccount = this._loginService.getIdAccount();
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
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
