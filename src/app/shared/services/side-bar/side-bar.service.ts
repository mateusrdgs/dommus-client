import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class SideBarService {

  @Output() sideBarEventEmitter = new EventEmitter();

  constructor() { }

  showSidebar(show: boolean) {
    this.sideBarEventEmitter.emit(show);
  }

}
