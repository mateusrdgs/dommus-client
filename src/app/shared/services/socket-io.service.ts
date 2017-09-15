import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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

  listenToEvent(eventName: string) {
    const observable = new Observable(observer => {
      this._socket.on(eventName, data => {
        observer.next(data);
      });
      return () => {
        this._socket.disconnect();
      };
    });
    return observable;
  }

  emitMessage(messageName: string, data: any) {
    return this._socket.emit(messageName, data);
  }

  emitMessageWithReturn(messageToSend: string, messageToListen: string, data: any): Observable<any> {
    const observable = new Observable(observer => {
      this._socket.on(messageToListen, returnedData => {
        observer.next(returnedData);
      });
      this._socket.emit(messageToSend, data);
      return () => {
        this._socket.disconnect();
      };
    });
    return observable;
  }
}
