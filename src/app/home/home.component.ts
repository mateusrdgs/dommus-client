import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from './../shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  _id: string;

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.getIdAccount();
  }

  getIdAccount() {
    this._id = this._localStorageService.getIdAccount();
  }

}
