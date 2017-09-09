import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser/';

@Injectable()
export class TitleService {

  constructor(
    private _title: Title
  ) {

  }

  getTitle(): string {
    return this._title.getTitle();
  }

  setTitle(newTitle: string) {
    this._title.setTitle(`Dommus - ${newTitle}`);
  }

}
