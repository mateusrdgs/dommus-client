import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Switch from '../../../../shared/classes/switch';
import Light from '../../../../shared/classes/light';
import Sensor from '../../../../shared/classes/sensor';
import Motion from '../../../../shared/classes/motion';
import Thermometer from '../../../../shared/classes/thermometer';
import Servo from '../../../../shared/classes/servo';

import { viewAnimation } from './../../../../shared/animations/view.animation';

@Component({
  selector: 'component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class ComponentComponent implements OnInit {

  component: any;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute
        .data
        .map(response => response['component'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            this.component = response.json()['Component'];
            this.iterateOverComponent(this.component);
          }
        });
  }

  iterateOverComponent(component: any): any {
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
