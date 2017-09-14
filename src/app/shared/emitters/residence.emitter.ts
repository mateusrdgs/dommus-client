import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ResidenceEmitter {

  enteredResidence: EventEmitter<string> = new EventEmitter();

  constructor() { }

}
