import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../../shared/services/auth/auth.service';

import Room from './../../classes/room';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Switch from '../../../../shared/classes/switch';
import Thermometer from '../../../../shared/classes/thermometer';
import Light from '../../../../shared/classes/light';
import Motion from '../../../../shared/classes/motion';
import Servo from '../../../../shared/classes/servo';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class RoomComponent implements OnInit {

  public room: Room;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
    .map(response => response['room'])
    .subscribe(response => {
      const userIsAdmin = this._authService.checkUserPermission('Dommus_User');
      if (response.hasOwnProperty('status') && response.status === 200) {
        const room = response.json()['Room'],
              { description, _id, components } = room;
        if (userIsAdmin) {
          this.room = new Room(description, _id,
            this.iterateOverComponents(components).concat([
                { isntItem: true, routePath: 'components', description: 'Cadastrar novo componente' },
            ]));
        } else {
          this.room = new Room(description, _id, this.iterateOverComponents(components));
        }
        this._topBarEmitter.emitNewRouteTitle(description);
      } else {
        console.error(response);
      }
    }, error => {
      console.error(error);
    });
  }

  iterateOverComponents(components: any) {
    return components.map(component => {
      const { type } = component;
      switch (component.type) {
        case '1': {
          return this.returnSwitch(component);
        }
        case '2': {
          return this.returnLight(component);
        }
        case '3': {
          return this.returnLight(component);
        }
        case '4': {
          return this.returnMotion(component);
        }
        case '5': {
          console.log(component);
          break;
        }
        case '6': {
          return this.returnServo(component);
        }
      }
    });
  }

  returnSwitch(component: any): Switch {
    const { _id, description, type, digitalPin, idBoard, command } = component;
    return new Switch(idBoard, description, digitalPin, command, type, _id);
  }

  returnThermometer(component: any): Thermometer {
    const { _id, description, type, analogPin, frequency, idBoard } = component;
    return new Thermometer(idBoard, description, type, 'LM35', analogPin, frequency, _id);
  }

  returnLight(component: any): Light {
    const { _id, description, type, analogPin, frequency, threshold, idBoard } = component;
    return new Light(idBoard, description, type, 'DEFAULT', analogPin, frequency, threshold, _id);
  }

  returnMotion(component: any): Motion {
    const { _id, description, type, digitalPin, idBoard } = component; {
      return new Motion(idBoard, description, type, digitalPin, _id);
    }
  }

  returnServo(component: any): Servo {
    const { _id, description, type, digitalPin, startAt, range, idBoard, command } = component;
    return new Servo(idBoard, description, type, digitalPin, startAt, range[0], range[1], command, _id);
  }

}
