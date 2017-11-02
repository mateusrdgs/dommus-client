import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../../shared/services/auth/auth.service';
import { LocalStorageService } from './../../shared/services/local-storage/local-storage.service';
import { SocketIoService } from './../../shared/services/socket-io/socket-io.service';
import { TopBarEmitter } from './../../shared/emitters/top-bar.emitter';

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
      const residenceUrl = this._localStorageService.getTokenPropertyValue('Dommus_Residence', 'url', false),
            idUser = this._localStorageService.getTokenPropertyValue('Dommus_User', 'id', false);
      if (residenceUrl !== '' && idUser !== '') {
        this.connectToModule(residenceUrl, idUser);
      }
    }, 500);
  }

  connectToModule(url: string, idUser: string) {
    this._socketIoService
        .checkLocalModuleConnectionState(url, idUser)
        .then(connectionEstablished => {
          if (connectionEstablished) {
            this._componentsSubscription = this.subscribeToEvent('components:Get');
            this.emitMessage('components:Get', true);
            this.connectedToLocalModule = true;
          }
        })
        .catch(error => console.error(error));
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
