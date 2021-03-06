import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../../shared/services/auth/auth.service';
import { LocalStorageService } from './../../../../shared/services/local-storage/local-storage.service';
import { ResidenceEmitter } from './../../../../shared/emitters/residence.emitter';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';

import Residence from './../../classes/residence';
import Board from '../../../boards/classes/board';
import Room from '../../../rooms/classes/room';
import Switch from '../../../../shared/classes/switch';
import Thermometer from '../../../../shared/classes/thermometer';
import Light from '../../../../shared/classes/light';
import Motion from '../../../../shared/classes/motion';
import Servo from '../../../../shared/classes/servo';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class ResidenceComponent implements OnInit {

  residence: Residence;
  data: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _residenceEmitter: ResidenceEmitter,
    private _socketIoService: SocketIoService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
    .map(response => response['residence'])
    .subscribe(response => {
      const userIsAdmin = this._authService.checkUserPermission('Dommus_User');
      if (response.hasOwnProperty('status') && response.status === 200) {
        const { description, url, _id, rooms, boards } = response.json()['Residence'];
        if (userIsAdmin) {
          this.residence = new Residence(description, url, _id,
            this.iterateOverRooms(rooms)
                .concat([{ isntItem: true, routePath: 'rooms', description: 'Cadastrar nova dependência' }]),
            this.iterateOverBoards(boards)
                .concat([{ isntItem: true, routePath: 'boards', description: 'Cadastrar nova placa' }]));
        } else {
          this.residence = new Residence(description, url, _id,
            this.iterateOverRooms(rooms),
            this.iterateOverBoards(boards));
        }
        if (_id) {
          const token = { id: _id, url };
          this._residenceEmitter.enteredResidence.emit(_id);
          this.saveResidenceDataOnLocalStorage(_id, url);
          this._topbarEmitter.emitNewRouteTitle(this.residence.Description);
        }
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    })
    .unsubscribe();
  }

  saveResidenceDataOnLocalStorage(id: string, url: string) {
    this._localStorageService.encodeAndSaveToken('Dommus_Residence', JSON.stringify({ id, url }));
  }

  iterateOverBoards(boards: any): any[] {
    return boards.map(board => {
      const { _id, port, model, digitalPins, description, analogPins } = board;
      return new Board(description, model, port, analogPins, digitalPins, _id);
    });
  }

  iterateOverRooms(rooms: any): any[] {
    return rooms.map(room => {
      const { _id, description, components } = room;
      return new Room(description, _id, components);
    });
  }

  iterateOverComponents(components: any): any[] {
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
