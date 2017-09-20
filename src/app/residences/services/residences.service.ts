import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './../../shared/services/auth/auth.service';
import { LocalStorageService } from './../../shared/services/local-storage/local-storage.service';
import { Residence } from './../residence';

import { url } from '../../database';

@Injectable()
export class ResidencesService {

  private _headers: Headers;
  private _idAccount: string;
  private _options: object;
  private _token: string;

  constructor(
    private _authService: AuthService,
    private _http: Http,
    private _localStorageService: LocalStorageService
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

  getResidences() {
    const _url = this.mount_Url('GETALL', url, this._idAccount);
    return this._http.get(_url, this._options)
               .toPromise()
               .then(response => response.json().Residences)
               .catch(this.handleError);
  }

  getResidenceById(idResidence: string) {
    const _url = this.mount_Url('BYID', url, this._idAccount, idResidence);
    const options = this._authService.createRequestOptions(this._headers);
    return this._http.get(_url, this._options)
               .toPromise()
               .then(response => response.json().Residence)
               .catch(this.handleError);
  }

  createResidence(residence: Residence) {
    const _url = this.mount_Url('CREATE', url,  this._idAccount);
    return this._http.post(_url, residence, this._options)
               .toPromise()
               .then(response => response.json().Residence)
               .catch(this.handleError);
  }

  updateResidence(residence: Residence) {
    const idResidence = residence['Id'],
          _url = this.mount_Url('BYID', url,  this._idAccount, idResidence);
    return this._http.put(_url, residence, this._options)
               .toPromise()
               .then(response => response.json().Residence)
               .catch(this.handleError);
  }

  deleteResidence(idResidence: string) {
    const _url = this.mount_Url('BYID', url,  this._idAccount, idResidence);
    return this._http.delete(_url, this._options)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
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
