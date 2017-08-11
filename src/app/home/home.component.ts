import { Component, OnInit } from '@angular/core';

import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  _id: string;
  idResidence: string;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.getIdAccount();
    this.getIdResidence();
  }

  getIdAccount() {
    this._id = this._authService.getDataFromToken('_id');
  }

  getIdResidence() {
    const token = this._authService.getToken('lastEnteredResidence');
    if (token) {
      this.idResidence = token;
    }
  }

}
