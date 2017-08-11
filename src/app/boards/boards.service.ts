import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AuthService } from './../shared/services/auth.service';
import { Board } from './board';

import { url } from './../database';

@Injectable()
export class BoardsService {

  private _headers: Headers;
  private _idAccount: string;
  private _options: object;
  private _token: string;

  constructor(
    private _http: Http,
    private _authService: AuthService
  ) {
    this.startServiceOptions();
  }

  startServiceOptions() {
    this._headers = this._authService.createRequestHeaders();
    this._idAccount = this._authService.getDataFromToken('_id');
    this._token = this._authService.getTokenValue('dommusRemote', 'token');
    this._authService.createAuthorizationHeader(this._headers, this._token);
    this._options = this._authService.createRequestOptions(this._headers);
  }

  getBoards(idResidence: string) {
    const _url = this.mountUrl('GETALL', url, this._idAccount, idResidence);
    return this._http.get(_url, this._options)
                     .toPromise()
                     .then(response => response.json().Boards)
                     .catch(error => this.handleError);
  }

  getBoardById(idResidence: string, idBoard: string) {
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idBoard);
    return this._http.get(_url, this._options)
                     .toPromise()
                     .then(response => response.json().Board)
                     .catch(error => this.handleError);
  }

  createBoard(idResidence: string, description: string, model: number, port: number) {
    const _url = this.mountUrl('CREATE', url, this._idAccount, idResidence);
    return this._http.post(_url, { description, model, port }, this._options)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  updateBoard(idResidence: string, board: Board) {
    const idBoard = board.Id, _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idBoard);
    return this._http.put(_url, board, this._options)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  deleteBoard(idResidence: string, idBoard: string) {
    const _url = this.mountUrl('BYID', url, this._idAccount, idResidence, idBoard);
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

  mountUrl(type: string, url: string, idAccount: string, idResidence: string, idBoard?: string) {
    switch (type) {
      case 'CREATE':
        return `${url}/${idAccount}/residences/${idResidence}/boards/new`;
      case 'GETALL':
        return `${url}/${idAccount}/residences/${idResidence}/boards`;
      case 'BYID':
        return `${url}/${idAccount}/residences/${idResidence}/boards/${idBoard}`;
    }
  }

}
