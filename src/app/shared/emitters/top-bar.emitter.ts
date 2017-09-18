import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TopBarEmitter {

  public stateEmitter: EventEmitter<boolean> = new EventEmitter();
  public titleEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  emitNewRouteTitle(title: string) {
    this.titleEmitter.emit(title);
  }

}
