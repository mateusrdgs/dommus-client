import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../shared/services/auth/auth.service';
import { LocalStorageService } from './../shared/services/local-storage/local-storage.service';
import { SocketIoService } from './../shared/services/socket-io/socket-io.service';
import { TopBarEmitter } from './../shared/emitters/top-bar.emitter';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  private _componentsSubscription: Subscription;
  protected components: any;
  protected connectedToLocalModule = false;

  constructor(
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _socketIoService: SocketIoService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Dashboard');
    setTimeout(() => {
      const residenceUrl = this._localStorageService.getTokenPropertyValue('currentResidence', 'url', false);
      if (residenceUrl !== '') {
        this.connectToModule(residenceUrl);
      }
    }, 500);
  }

  connectToModule(url: string) {
    this._socketIoService
        .checkLocalModuleConnectionState(url)
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
