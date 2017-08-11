import { Component, OnInit } from '@angular/core';

import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  _id: string;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.getIdAccount();
  }

  getIdAccount() {
    this._id = this._authService.getDataFromToken('_id');
  }

}
