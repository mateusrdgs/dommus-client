import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../shared/services/auth.service';
import { SocketIoEmitter } from './../shared/emitters/socket-io.emitter';
import { SocketIoService } from './../shared/services/socket-io.service';
import { SyncService } from './../shared/services/sync.service';
import { TopBarEmitter } from './../shared/emitters/top-bar.emitter';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  private _componentsSubscription: Subscription;
  private _socketIoSubscription: Subscription;
  private _syncSubscription: Subscription;
  protected components: any;
  protected connectedToLocalModule = false;

  constructor(
    private _authService: AuthService,
    private _socketIoEmitter: SocketIoEmitter,
    private _socketIoService: SocketIoService,
    private _syncService: SyncService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.connectToModule();
    this._topbarEmitter.emitNewRouteTitle('Dashboard');
  }

  connectToModule() {
    this._socketIoService
        .checkLocalModuleConnectionState('')
        .then(connectionEstablished => {
          if (connectionEstablished) {
            this._componentsSubscription = this.subscribeToEvent('get:Components');
            this.emitMessage('get:Components', true);
            this.connectedToLocalModule = true;
          }
        });
  }

  subscribeToEvent(eventName: string) {
    return this._socketIoService
      .listenToEvent(eventName)
      .subscribe((data: any) => {
        if (eventName === 'changed:Component') {
          console.log(data);
        } else {
          this.components = data;
        }
      });
  }

  emitMessage(eventName: string, eventData: any) {
    this._socketIoService.emitMessage(eventName, eventData);
  }

}
