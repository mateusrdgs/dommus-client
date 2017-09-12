import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CardEmitter {

  public cardEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
