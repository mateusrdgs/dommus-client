import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from '../../../../shared/emitters/top-bar.emitter';

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
    private _activatedRoute: ActivatedRoute,
    private _topbarEmitter: TopBarEmitter
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
            const component = response.json()['Component'];
            this.component =
              this.mapComponentProperties(
                this.iterateOverComponent(component)
              );
            this._topbarEmitter.emitNewRouteTitle(this.component[1].value);
          }
        });
  }

  iterateOverComponent(component: any): any {
    switch (component.type) {
      case '1': {
        return this.returnSwitch(component);
      }
      case '2': {
        return this.returnThermometer(component);
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
    const { _id, description, type, digitalPin, command, idBoard } = component;
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
    const { _id, description, type, digitalPin, startAt, range, command, idBoard } = component;
    return new Servo(idBoard, description, type, digitalPin, startAt, range[0], range[1], command, _id);
  }

  mapComponentProperties(component: any) {
    switch (component.constructor) {
      case Switch: {
        return this.returnMappedSwitch(component);
      }
      case Thermometer: {
        return this.returnMappedThermometer(component);
      }
      case Light: {
        return this.returnMappedLight(component);
      }
      case Motion: {
        return this.returnMappedMotion(component);
      }
      case Servo: {
        return this.returnMappedMotion(component);
      }
    }
  }

  returnMappedSwitch(component: Switch): any {
    const { Id, Description, DigitalPin, Command } = component;
    return [
      {
        property: 'Id',
        value: Id
      },
      {
        property: 'Descrição',
        value: Description
      },
      {
        property: 'Pino digital',
        value: DigitalPin
      },
      {
        property: 'Comando - Ligar',
        value: Command[0]
      },
      {
        property: 'Comando - Desligar',
        value: Command[1]
      }
    ];
  }

  returnMappedThermometer(component: Thermometer) {
    const { Id, Description, AnalogPin, Frequency } = component;
    return [
      {
        property: 'Id',
        value: Id
      },
      {
        property: 'Description',
        value: Id
      },
      {
        property: 'Pino analógico',
        value: Id
      },
      {
        property: 'Frequência (ms)',
        value: Frequency
      }
    ];
  }

  returnMappedLight(component: Light) {
    const { Id, Description, AnalogPin, Frequency, Threshold, IdBoard } = component;
    return [
      {
        property: 'Id',
        value: Id
      },
      {
        property: 'Description',
        value: Id
      },
      {
        property: 'Pino analógico',
        value: Id
      },
      {
        property: 'Frequência (ms)',
        value: Frequency
      },
      {
        property: 'Limite de variação',
        value: Threshold
      }
    ];
  }

  returnMappedMotion(component: Motion): any {
    const { Id, Description, DigitalPin } = component;
    return [
      {
        property: 'Id',
        value: Id
      },
      {
        property: 'Descrição',
        value: Description
      },
      {
        property: 'Pino digital',
        value: DigitalPin
      }
    ];
  }

  returnMappedServo(component: Servo): any {
    const { Id, Description, Type, DigitalPin, StartAt, Range, IdBoard, Command } = component;
    return [
      {
        property: 'Id',
        value: Id
      },
      {
        property: 'Descrição',
        value: Description
      },
      {
        property: 'Pino digital',
        value: Id
      },
      {
        property: 'Inicia em',
        value: Id
      },
      {
        property: 'Range',
        value: Id
      },
      {
        property: 'Comando',
        value: Command[0]
      }
    ];
  }

}
