import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {

  constructor() { }

  private getWindow(): Window {
    return window;
  }

  window(): Window {
    return this.getWindow();
  }

}
