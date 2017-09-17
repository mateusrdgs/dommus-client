import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SocketIoEmitter {

  socketIoEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

}
