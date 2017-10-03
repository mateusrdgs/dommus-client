import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as io from 'socket.io-client';

import { SocketIoEmitter } from './../../emitters/socket-io.emitter';

@Injectable()
export class SocketIoService {

  private _connectionStarted = false;
  private _socket;

  constructor(
    private _socketIoEmitter: SocketIoEmitter
  ) {
  }

  connectToLocalModule(url: string) {
    return new Promise((resolve, reject) => {
      this._socket = io(url);
      this._socket.on('connect_error', (error) => {
        reject(error);
      });
      this._socket.on('connect', () => {
        this._connectionStarted = true;
        resolve(this._socket['connected']);
      });
    });
  }

  checkLocalModuleConnectionState(url: string) {
    return new Promise((resolve, reject) => {
      if (this._socket === undefined) {
        resolve(this.connectToLocalModule(url));
      } else {
        resolve(this._socket['connected']);
      }
    });
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
