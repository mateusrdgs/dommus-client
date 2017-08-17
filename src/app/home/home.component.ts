import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../shared/services/auth.service';
import { SocketIoService } from './../shared/socket-io.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  _id: string;
  idResidence: string;
  private _socketSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _socketIo: SocketIoService
  ) { }

  ngOnInit() {
    this.getIdAccount();
    this.getIdResidence();
    this.startSubscription();
    this._socketIo.sendMessage('data', 'message');
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

  startSubscription() {
    this._socketSubscription =
      this._socketIo.connect()
      .subscribe(data => {
        console.log(data);
      });
  }

}
