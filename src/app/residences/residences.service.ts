import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { LoginService } from './../login/login.service';
import { Residence } from './residence';

import { url } from '../database';

@Injectable()
export class ResidencesService {

  private _id: string;

  constructor(
    private _http: Http,
    private _loginService: LoginService
  ) {
    this.getIdAccount();
  }

  getResidences() {
    const _url = this.mount_Url('GETALL', url, this._id);
    return this._http.get(_url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getResidenceById(idResidence: string) {
    const _url = this.mount_Url('BYID', url, this._id, idResidence);
    return this._http.get(_url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  createResidence(residence: Residence) {
    const _url = this.mount_Url('CREATE', url,  this._id);
    return this._http.post(_url, residence)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  updateResidence(residence: Residence) {
    const idResidence = residence['Id'],
          _url = this.mount_Url('BYID', url,  this._id, idResidence);
    return this._http.put(_url, residence)
               .toPromise()
               .then(response => response.json())
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
    this._id = this._loginService.getIdAccount();
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error['_body'] || error.message || error);
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
