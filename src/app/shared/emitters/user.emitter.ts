import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UserEmitter {

  public userCanEnter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  emitCorrectPassword(canEnter: boolean) {
    this.userCanEnter.emit(canEnter);
  }

}
