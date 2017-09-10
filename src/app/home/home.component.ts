import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../shared/services/auth.service';
import { SocketIoService } from './../shared/services/socket-io.service';
import { SyncService } from './../shared/services/sync.service';
import { TopBarEmitter } from './../shared/emitters/top-bar.emitter';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  _id: string;
  idResidence: string;
  components;
  private _componentsSubscription: Subscription;
  private _syncSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _socketIo: SocketIoService,
    private _syncService: SyncService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.getIdAccount();
    this.getIdResidence();
    if (this.idResidence) {
      this._componentsSubscription = this.subscribeTo('get:Components');
      this._syncSubscription = this.subscribeTo('app:Sync');
      this.emitMessage('get:Components', true);
    }
    this._topbarEmitter.emitNewRouteTitle('Dashboard');
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

  subscribeTo(eventName: string) {
    return this._socketIo.listenToEvent(eventName)
      .subscribe((data: any) => {
        if (eventName === 'app:Sync') {
          this._syncService.syncApps(this.idResidence).then(residence => {
            data(residence);
          });
        } else if (eventName === 'changed:Component') {
          console.log(data);
        } else {
          this.components = data;
          console.log(this.components);
        }
      });
  }

  emitMessage(eventName: string, eventData: any) {
    this._socketIo.emitMessage('get:Components', true);
  }

}
