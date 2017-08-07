import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { id, url } from './../database';

// import { Component } from './board';

@Injectable()
export class ComponentsService {

  constructor(
    private _http: Http
  ) { }

  getComponents() {

  }

  getComponentById() {

  }

  createComponent() {

  }

  updateComponent() {

  }

  deleteComponent() {

  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
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
