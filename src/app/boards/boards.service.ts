import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { id, url } from './../database';

import { Board } from './board';

@Injectable()
export class BoardsService {

  constructor(
    private _http: Http
  ) { }

  getBoards(idResidence: string) {
    const _url = this.mountUrl('GETALL', url, id, idResidence);
    return this._http.get(_url)
                     .toPromise()
                     .then(response => response.json())
                     .catch(error => this.handleError);
  }

  getBoardById(idResidence: string, idBoard: string) {
    const _url = this.mountUrl('BYID', url, id, idResidence, idBoard);
    return this._http.get(_url)
                     .toPromise()
                     .then(response => response.json())
                     .catch(error => this.handleError);
  }

  createBoard(idResidence: string, description: string, model: number, port: number) {
    const _url = this.mountUrl('CREATE', url, id, idResidence);
    return this._http.post(_url, { description, model, port })
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  updateBoard(idResidence: string, board: Board) {
    const idBoard = board.Id, _url = this.mountUrl('BYID', url, id, idResidence, idBoard);
    return this._http.put(_url, board)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  deleteBoard(idResidence: string, idBoard: string) {
    const _url = this.mountUrl('BYID', url, id, idResidence, idBoard);
    return this._http.delete(_url)
                     .toPromise()
                     .then(response => response.json())
                     .catch(this.handleError);
  }

  handleError(error: Error): Promise<any> {
    return Promise.reject(error.message || error);
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
