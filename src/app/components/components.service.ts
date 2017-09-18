import { Injectable, Component } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './../shared/services/auth/auth.service';
import { LocalStorageService } from './../shared/services/local-storage/local-storage.service';

import { url } from './../database';

@Injectable()
export class ComponentsService {

  private _headers: Headers;
  private _idAccount: string;
  private _options: object;
  private _token: string;

  constructor(
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _http: Http
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

  getComponents(idResidence: string, idRoom: string) {
    const _url = this.mountUrl('GETALL', url, this._idAccount, idResidence, idRoom);
    return this._http.get(_url, this._options)
                     .toPromise()
                     .then(response => response.json().Components)
                     .catch(this.handleError);
  }

  getComponentById(idResidence: string, idRoom: string, idComponent: string) {
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idRoom, idComponent);
    return this._http.get(_url, this._options)
                     .toPromise()
                     .then(response => response.json().Component)
                     .catch(this.handleError);
  }

  createComponent(idResidence: string, idRoom: string, component: any) {
    const _url = this.mountUrl('CREATE', url, this._idAccount, idResidence, idRoom);
    return this._http.post(_url, component, this._options)
                     .toPromise()
                     .then(response => response.json().Component)
                     .catch(this.handleError);
  }

  updateComponent(idResidence: string, idRoom: string, component: any) {
    const { id } = component;
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idRoom, id);
    return this._http.put(_url, component, this._options)
                     .toPromise()
                     .then(response => response.json().Component)
                     .catch(this.handleError);
  }

  deleteComponent(idResidence: string, idRoom: string, idComponent: string) {
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idRoom, idComponent);
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

  mountUrl(type: string, url: string, idAccount: string, idResidence: string, idRoom?: string, idComponent?: string) {
    switch (type) {
      case 'CREATE':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/${idRoom}/components/new`;
      case 'GETALL':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/${idRoom}/components`;
      case 'BYID':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/${idRoom}/components/${idComponent}`;
    }
  }

}
