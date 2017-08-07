import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Residence } from './residence';

import { id, url } from '../database';

@Injectable()
export class ResidencesService {

  constructor(
    private _http: Http
  ) { }

  getResidences() {
    const _url = this.mount_Url('GETALL', url, id);
    return this._http.get(_url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getResidenceById(idResidence: string) {
    const _url = this.mount_Url('BYID', url, id, idResidence);
    return this._http.get(_url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  createResidence(residence: Residence) {
    const _url = this.mount_Url('CREATE', url, id);
    return this._http.post(_url, residence)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  updateResidence(residence: Residence) {
    const idResidence = residence['Id'],
          _url = this.mount_Url('BYID', url, id, idResidence);
    return this._http.put(_url, residence)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  deleteResidence(idResidence: string) {
    const _url = this.mount_Url('BYID', url, id, idResidence);
    return this._http.delete(_url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
  }

  mount_Url(type: string, _url: string, idAccount: string, idResidence?: string) {
    switch (type) {
      case 'CREATE':
        return `${_url}/${idAccount}/residences/${idResidence}/new`;
      case 'GETALL':
        return `${_url}/${idAccount}/residences/`;
      case 'BYID':
        return `${_url}/${idAccount}/residences/${idResidence}`;
    }
  }

}
