import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Residence } from './residence';

@Injectable()
export class ResidencesService {

  private _id = '5984a2f632c9f33c0a3df156';
  private _url = `http://localhost:3000/api/account/${this._id}/residences`;

  constructor(
    private _http: Http
  ) { }

  getResidences() {
    return this._http.get(this._url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getResidenceById(id: string) {
    const url = this._url.concat(`/${id}`);
    return this._http.get(this._url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  createResidence(residence: Residence) {
    return this._http.post(this._url, residence)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  updateResidence(residence: Residence) {
    const id = residence.Id,
          url = this._url.concat(`/${id}`);
    return this._http.put(this._url, residence)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  deleteResidence(id: string) {
    const url = this._url.concat(`/${id}`);
    return this._http.delete(this._url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
