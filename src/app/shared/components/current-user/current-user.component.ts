import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from './../../services/local-storage/local-storage.service';

@Component({
  selector: 'current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.styl']
})
export class CurrentUserComponent implements OnInit {

  name: string;

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.name = this._localStorageService
                    .getTokenPropertyValue('Dommus_User', 'name', false);
  }

}
