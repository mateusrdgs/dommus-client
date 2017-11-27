import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../../shared/services/auth/auth.service';
import { LocalStorageService } from './../../shared/services/local-storage/local-storage.service';
import { SocketIoService } from './../../shared/services/socket-io/socket-io.service';
import { TopBarEmitter } from './../../shared/emitters/top-bar.emitter';

import Switch from '../../shared/classes/switch';
import Thermometer from '../../shared/classes/thermometer';
import Light from '../../shared/classes/light';
import Motion from '../../shared/classes/motion';
import Servo from '../../shared/classes/servo';

import { viewAnimation } from './../../shared/animations/view.animation';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
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
          this.components = this.iterateOverComponents(data);
        }
      });
  }

  iterateOverComponents(components: any): any[] {
    return components.map(component => {
      const { type } = component;
      switch (component.type) {
        case 1: {
          return this.returnSwitch(component);
        }
        case 2: {
          return this.returnLight(component);
        }
        case 3: {
          return this.returnLight(component);
        }
        case 4: {
          return this.returnMotion(component);
        }
        case 5: {
          console.log(component);
          break;
        }
        case 6: {
          return this.returnServo(component);
        }
      }
    });
  }

  returnSwitch(component: any): Switch {
    const { id, description, type, digitalPin, idBoard, isOn, command } = component;
    return new Switch(idBoard, description, digitalPin, command, type, id, isOn);
  }

  returnThermometer(component: any): Thermometer {
    const { id, description, type, analogPin, frequency, idBoard } = component;
    return new Thermometer(idBoard, description, type, 'LM35', analogPin, frequency, id);
  }

  returnLight(component: any): Light {
    const { id, description, type, analogPin, frequency, threshold, idBoard } = component;
    return new Light(idBoard, description, type, 'DEFAULT', analogPin, frequency, threshold, id);
  }

  returnMotion(component: any): Motion {
    const { id, description, type, digitalPin, idBoard } = component; {
      return new Motion(idBoard, description, type, digitalPin, id);
    }
  }

  returnServo(component: any): Servo {
    const { id, description, type, digitalPin, startAt, range, idBoard, command } = component;
    return new Servo(idBoard, description, type, digitalPin, startAt, range[0], range[1], command, id);
  }

  emitMessage(eventName: string, eventData: any) {
    this._socketIoService.emitMessage(eventName, eventData);
  }

}
