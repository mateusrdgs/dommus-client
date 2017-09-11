import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CardEmitter {

  public cardEventEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

}
