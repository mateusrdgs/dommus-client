import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IRemote } from './../../interfaces/remote';

import { AuthService } from './../auth/auth.service';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { SocketIoService } from './../socket-io/socket-io.service';

@Injectable()
export class RemoteService implements IRemote {

  private _headers: Headers;
  private _options: object;
  private _token: string;

  constructor(
    private _authService: AuthService,
    private _http: Http,
    private _localStorageService: LocalStorageService,
    private _socketIoService: SocketIoService
  ) {
    this.generateRemoteServiceOptions();
  }

  generateRemoteServiceOptions() {
    this._token = this._localStorageService.getTokenValue('Dommus');
    this._headers = this._authService.createRequestHeaders();
    this._authService.createAuthorizationHeader(this._headers, this._token);
    this._options = this._authService.createRequestOptions(this._headers);
  }

  getResources(url: string): Observable<any> {
    return this._http.get(url, this._options)
                     .map((response: any) => response)
                     .catch((error: any) => Observable.throw(error.json().error));
  }

}
