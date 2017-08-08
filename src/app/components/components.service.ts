import { Injectable, Component } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { id, url } from './../database';

// import { Component } from './board';

@Injectable()
export class ComponentsService {

  constructor(
    private _http: Http
  ) { }

  getComponents(idResidence: string, idRoom: string) {
    const _url = this.mountUrl('GETALL', url, id, idResidence, idRoom);
    return this._http.get(_url)
                     .toPromise()
                     .then(response => response.json().Components)
                     .catch(this.handleError);
  }

  getComponentById(idResidence: string, idRoom: string, idComponent: string) {
    const _url = this.mountUrl('BYID', url, id, idResidence, idRoom, idComponent)
    return this._http.get(_url)
                     .toPromise()
                     .then(response => response.json().Component)
                     .catch(this.handleError);
  }

  createComponent(idResidence: string, idRoom: string, component: any) {
    const _url = this.mountUrl('CREATE', url, id, idResidence, idRoom);
    return this._http.post(_url, component)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  updateComponent(idResidence: string, idRoom: string, component: any) {
    const { id } = component;
    const _url = this.mountUrl('BYID', url, id, idRoom, id);
    return this._http.put(_url, component)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  deleteComponent(idResidence: string, idRoom: string, idComponent: string) {
    const _url = this.mountUrl('BYID', url, id, idResidence, idRoom, idComponent);
    return this._http.delete(_url)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error['_body'] || error.message || error);
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
