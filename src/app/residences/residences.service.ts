import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LocalStorageService } from './../shared/services/local-storage.service';
import { Residence } from './residence';

import { url } from '../database';

@Injectable()
export class ResidencesService {

  private _id: string;

  constructor(
    private _http: Http,
    private _localStorageService: LocalStorageService
  ) {
    this.getIdAccount();
  }

  getResidences() {
    const _url = this.mount_Url('GETALL', url, this._id);
    return this._http.get(_url)
               .toPromise()
               .then(response => response.json().Residences)
               .catch(this.handleError);
  }

  getResidenceById(idResidence: string) {
    const _url = this.mount_Url('BYID', url, this._id, idResidence);
    return this._http.get(_url)
               .toPromise()
               .then(response => response.json().Residence)
               .catch(this.handleError);
  }

  createResidence(residence: Residence) {
    const _url = this.mount_Url('CREATE', url,  this._id);
    return this._http.post(_url, residence)
               .toPromise()
               .then(response => response.json().Residence)
               .catch(this.handleError);
  }

  updateResidence(residence: Residence) {
    const idResidence = residence['Id'],
          _url = this.mount_Url('BYID', url,  this._id, idResidence);
    return this._http.put(_url, residence)
               .toPromise()
               .then(response => response.json().Residence)
               .catch(this.handleError);
  }

  deleteResidence(idResidence: string) {
    const _url = this.mount_Url('BYID', url,  this._id, idResidence);
    return this._http.delete(_url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getIdAccount() {
    this._id = this._localStorageService.getIdAccount();
  }

  handleError(error: Error) {
    return Promise.reject(error['_body'] || error.message || error)
                  .catch(err => console.error(err));
  }

  mount_Url(type: string, _url: string, idAccount: string, idResidence?: string) {
    switch (type) {
      case 'CREATE':
        return `${_url}/${idAccount}/residences/new`;
      case 'GETALL':
        return `${_url}/${idAccount}/residences/`;
      case 'BYID':
        return `${_url}/${idAccount}/residences/${idResidence}`;
    }
  }

}
