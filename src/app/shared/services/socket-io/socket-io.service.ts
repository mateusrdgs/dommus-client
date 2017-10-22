import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as io from 'socket.io-client';

import { SocketIoEmitter } from './../../emitters/socket-io.emitter';

@Injectable()
export class SocketIoService {

  private _connectionStarted = false;
  private _socket;

  constructor(
    private _socketIoEmitter: SocketIoEmitter,
    private _router: Router
  ) {
  }

  connectToLocalModule(url: string, idUser: string) {
    return new Promise((resolve, reject) => {

      this._socket = io(url, { query: { idUser }} );
      this._socket.on('connect_error', error => {
        reject(error);
      });
      this._socket.on('disconnect', () => {
        reject(new Error('Disconnected'));
      });
      this._socket.on('connect', () => {
        this._connectionStarted = true;
        resolve(this._socket['connected']);
      });
    });
  }

  checkLocalModuleConnectionState(url: string, idUser: string) {
    return new Promise((resolve, reject) => {
      if (this._socket === undefined || this._socket['disconnected']) {
        resolve(this.connectToLocalModule(url, idUser));
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

  emitMessage(messageName: string, data: any, callback?: any) {
    return this._socket.emit(messageName, data, callback);
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
