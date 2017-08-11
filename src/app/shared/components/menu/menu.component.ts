import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {

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
