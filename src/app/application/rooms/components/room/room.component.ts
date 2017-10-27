import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Room from './../../classes/room';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Switch from '../../../components/classes/switch';
import Thermometer from '../../../components/classes/thermometer';
import Light from '../../../components/classes/light';
import Motion from '../../../components/classes/motion';
import Servo from '../../../components/classes/servo';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.styl']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
    .map(response => response['room'])
    .subscribe(response => {
      if (response.hasOwnProperty('status') && response.status === 200) {
        const room = response.json()['Room'],
              { description, _id, components } = room;
        this.room = new Room(description, _id,
          this.iterateOverComponents(components).concat([
              { isntItem: true, routePath: 'components', description: 'Create a new component' },
          ]));
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
    const { _id, description, type, digitalPin, idBoard } = component;
    return new Switch(idBoard, description, digitalPin, type, _id);
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
    const { _id, description, type, digitalPin, startAt, range, idBoard } = component;
    return new Servo(idBoard, description, type, digitalPin, startAt, range[0], range[1], _id);
  }

}
