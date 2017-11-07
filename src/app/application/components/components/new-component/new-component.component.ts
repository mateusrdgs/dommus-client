import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';
import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';

import Switch from '../../../../shared/classes/switch';
import Thermometer from '../../../../shared/classes/thermometer';
import Light from '../../../../shared/classes/light';
import Motion from '../../../../shared/classes/motion';
import Sensor from '../../../../shared/classes/sensor';
import Servo from '../../../../shared/classes/servo';

import Board from '../../../boards/classes/board';

import { validateSet } from '../../validators/setValidator';

@Component({
  selector: 'new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.styl']
})
export class NewComponentComponent implements OnInit {

  private _routeSubscription: Subscription;
  private _idResidence: string;
  private _idRoom: string;
  private _component;

  newComponentForm: FormGroup;
  firstBoardName: string;
  boards: Array<Board>;

  currentFormat = '0';

  components = [
    {
      value: 1,
      component: 'Interruptor'
    },
    {
      value: 2,
      component: 'Termômetro'
    },
    {
      value: 3,
      component: 'Luminosidade'
    },
    {
      value: 4,
      component: 'Movimento'
    },
    {
      value: 6,
      component: 'Servo motor'
    }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _socketIoService: SocketIoService,
    private _topBarEmitter: TopBarEmitter,
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) { }

  ngOnInit() {
    this._topBarEmitter.emitNewRouteTitle('Cadastrar novo componente');
    this.extractDataFromResolver();
    this.createNewComponentForm(this.currentFormat);
    this.createControls(this.currentFormat);
    if (this.boards.length) {
      this.firstBoardName = this.boards[0].Description;
    }
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['boards'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const boards = response.json()['Boards'];
            this.boards = this.iterateOverBoards(boards);
          }
        });
  }

  iterateOverBoards(boards: any): Array<Board> {
    return boards.map(board => {
      const { _id, port, model, digitalPins, description, analogPins } = board;
      return new Board(description, model, port, analogPins, digitalPins, _id);
    });
  }

  createNewComponentForm(nextFormType: string) {
    this.newComponentForm = this._formBuilder.group({
      description: ['', Validators.required],
      component: ['', Validators.required],
      board: ['', Validators.required]
    });
  }

  onChange() {
    const { component } = this.newComponentForm.value;
    this.removeControls(this.currentFormat);
    this.createControls(component);
    this.currentFormat = component;
  }

  onSubmit() {
    if (this.newComponentForm.valid) {
      const { component } = this.newComponentForm.value;
      switch (component) {
        case '1': {
          this.createSwitch(this.newComponentForm.value);
        }
        break;
        case '2': {
          this.createThermometer(this.newComponentForm.value);
        }
        break;
        case '3': {
          this.createLight(this.newComponentForm.value);
        }
        break;
        case '4': {
          this.createMotion(this.newComponentForm.value);
        }
        break;
        case '5': {
          this.createSensor(this.newComponentForm.value);
        }
        break;
        case '6': {
          this.createServo(this.newComponentForm.value);
        }
        break;
        default:
          return;
      }
    }
  }

  createSwitch(formValue) {
    const { description, component, board, digitalPin, commandOn, commandOff } = formValue;
    this._component = new Switch(board, description, digitalPin, [commandOn, commandOff], 1);
    this.saveNewComponent(this._component);
  }

  createThermometer(formValue) {
    const { description, component, board, analogPin, frequency, controller } = formValue;
    this._component = new Thermometer(board, description, 2, controller, analogPin, frequency);
    this.saveNewComponent(this._component);
  }

  createLight(formValue) {
    const { description, component, board, analogPin, threshold, frequency, controller } = formValue;
    this._component = new Light(board, description, 3, controller, analogPin, frequency, threshold);
    this.saveNewComponent(this._component);
  }

  createMotion(formValue) {
    const { description, component, board, digitalPin } = formValue;
    this._component = new Motion(board, description, 4, digitalPin);
    this.saveNewComponent(this._component);
  }

  createSensor(formValue) {
    const { description, component, board, analogPin, frequency, controller, threshold } = this.newComponentForm.value;
    this._component = new Sensor(board, description, 5, analogPin, frequency, controller, threshold);
    this.saveNewComponent(this._component);
  }

  createServo(formValue) {
    const { description, component, board, digitalPin, startAt, minRange, maxRange, command } = this.newComponentForm.value;
    this._component = new Servo(board, description, 6, digitalPin, startAt, minRange, maxRange, command);
    this.saveNewComponent(this._component);
  }

  saveNewComponent(component: any) {
    this._activatedRoute.params
        .subscribe(params => {
          const { idResidence, idRoom } = params,
                url = this._urlCreatorService.createUrl('components', 'new', { idResidence, idRoom });
          this.createComponent(url, component);
        })
        .unsubscribe();
  }

  createComponent(url: string, component: any) {
    this._remoteService
        .postResources(url, component)
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 201) {
            const { _id } = response.json()['Component'];
            component.Id = _id;
            this._socketIoService
                .emitMessage('component:Create', component, (created) => {
                  if (created) {
                    console.log(created);
                  }
                });
          }
        }, error => console.error(error));
  }

  createControls(nextFormType) {
    switch (nextFormType) {
      case '1':
          this.newComponentForm.addControl('digitalPin', new FormControl('', validateSet(this.boards[0]['digitalPins'])));
          this.newComponentForm.addControl('commandOn', new FormControl('', Validators.required));
          this.newComponentForm.addControl('commandOff', new FormControl('', Validators.required));
        break;
      case '2':
          this.newComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
        break;
      case '3':
      case '5':
        this.newComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('threshold', new FormControl('', [Validators.required]));
      break;
      case '4':
        this.newComponentForm.addControl('digitalPin', new FormControl('', validateSet(this.boards[0]['digitalPins'])));
      break;
      case '6':
          this.newComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('startAt', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('minRange', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('maxRange', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('command', new FormControl('', [Validators.required]));
        break;
      default:
        break;
    }
  }

  removeControls(previousFormType) {
    switch (previousFormType) {
      case '1': {
        this.newComponentForm.removeControl('digitalPin');
        this.newComponentForm.removeControl('commandOn');
        this.newComponentForm.removeControl('commandOff');
      }
      break;
      case '2': {
          this.newComponentForm.removeControl('analogPin');
          this.newComponentForm.removeControl('frequency');
        }
        break;
      case '3':
      case '5': {
          this.newComponentForm.removeControl('analogPin');
          this.newComponentForm.removeControl('frequency');
          this.newComponentForm.removeControl('threshold');
      }
        break;
      case '4': {
        this.newComponentForm.removeControl('digitalPin');
      }
      break;
      case '6': {
          this.newComponentForm.removeControl('digitalPin');
          this.newComponentForm.removeControl('rotation');
          this.newComponentForm.removeControl('startAt');
          this.newComponentForm.removeControl('minRange');
          this.newComponentForm.removeControl('maxRange');
          this.newComponentForm.removeControl('command');
      }
        break;
      default:
        break;
    }
  }
}
