import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

@Injectable()
export class SocketIoService {

  private _url = 'http://localhost:4000';
  private _socket;

  constructor(
  ) {
    this.connectToLocalModule();
  }

  connectToLocalModule() {
    this._socket = io(this._url);
  }

  connect() {
    const observable = new Observable(observer => {
      this._socket.on('message', data => {
        observer.next(data);
      });
      return () => {
        this._socket.disconnect();
      };
    });
    return observable;
  }

  sendMessage(messageName: string, data: any) {
    this._socket.emit(messageName, data);
  }
}
