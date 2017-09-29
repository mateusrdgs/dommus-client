import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { BoardsService } from './../../../boards/services/boards.service';
import { ComponentsService } from './../../services/components.service';
import { SocketIoService } from './../../../shared/services/socket-io/socket-io.service';

import Switch from '../../classes/switch';
import Thermometer from './../../classes/thermometer';
import Light from '../../classes/light';
import Motion from '../../classes/motion';
import Sensor from '../../classes/sensor';
import Servo from '../../classes/servo';

import Board from '../../../boards/classes/board';

import { validateSet } from '../../validators/setValidator';

@Component({
  selector: 'new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.styl']
})
export class NewComponentComponent implements OnInit {

  private _previousFormType = '0';
  private _routeSubscription: Subscription;
  private _idResidence: string;
  private _idRoom: string;
  private _component;

  newComponentForm: FormGroup;
  firstBoardName: string;
  boards: Array<Board>;

  components = [
    {
      value: 1,
      component: 'Switch'
    },
    {
      value: 2,
      component: 'Thermometer'
    },
    {
      value: 3,
      component: 'Light'
    },
    {
      value: 4,
      component: 'Motion'
    },
    {
      value: 5,
      component: 'Sensor'
    },
    {
      value: 6,
      component: 'Servo'
    }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _componentsService: ComponentsService,
    private _activatedRoute: ActivatedRoute,
    private _socketIoService: SocketIoService
  ) { }

  getResidenceRouteParams() {
    this.extractDataFromResolver();
    this._activatedRoute.params.subscribe((params: any) => {
      this._idResidence = params['idResidence'];
      this._idRoom = params['idRoom'];
    });
  }

  ngOnInit() {
    this.extractDataFromResolver();
    this.getResidenceRouteParams();
    this.createNewComponentForm(this._previousFormType);
    this.createControls(this._previousFormType);
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
      component: [nextFormType, Validators.required],
      board: [this.boards[0].Id, Validators.required]
    });
  }

  onChange() {
    const { component } = this.newComponentForm.value;
    this.removeControls(this._previousFormType);
    this.createControls(component);
    this._previousFormType = component;
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
    const { description, component, board, digitalPin } = formValue;
    this._component = new Switch(board, description, digitalPin, 1);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  createThermometer(formValue) {
    const { description, component, board, analogPin, frequency, controller } = formValue;
    this._component = new Thermometer(board, description, 2, controller, analogPin, frequency);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  createLight(formValue) {
    const { description, component, board, analogPin, threshold, frequency, controller } = formValue;
    this._component = new Light(board, description, 3, controller, analogPin, frequency, threshold);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  createMotion(formValue) {
    const { description, component, board, digitalPin } = formValue;
    this._component = new Motion(board, description, 4, digitalPin);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  createSensor(formValue) {
    const { description, component, board, analogPin, frequency, controller, threshold } = this.newComponentForm.value;
    this._component = new Sensor(board, description, 5, analogPin, frequency, controller, threshold);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  createServo(formValue) {
    const { description, component, board, digitalPin, rotation, startAt, minRange, maxRange } = this.newComponentForm.value;
    this._component = new Servo(board, description, 6, digitalPin, rotation, startAt, minRange, maxRange);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  saveNewComponent(_idResidence: string, _idRoom: string, component: any) {
    this._componentsService
        .createComponent(_idResidence, _idRoom, component)
        .then(response => {
          if (response['_id']) {
            this._socketIoService.emitMessage('create:Component', response);
          }
        })
        .catch(error => console.error(error));
  }

  createControls(nextFormType) {
    switch (nextFormType) {
      case '1':
          this.newComponentForm.addControl('digitalPin', new FormControl('', validateSet(this.boards[0]['digitalPins'])));
        break;
      case '2':
          this.newComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
        break;
      case '3':
        this.newComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('threshold', new FormControl('', [Validators.required]));
      break;
      case '4':
          this.newComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
        break;
      case '5':
          this.newComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('threshold', new FormControl('', [Validators.required]));
        break;
      case '6':
          this.newComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('rotation', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('startAt', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('minRange', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('maxRange', new FormControl('', [Validators.required]));
        break;
      default:
        break;
    }
    console.log(this.newComponentForm.controls);
  }

  removeControls(previousFormType) {
    switch (previousFormType) {
      case '1': {
          this.newComponentForm.removeControl('digitalPin');
        }
        break;
      case '2': {
          this.newComponentForm.removeControl('analogPin');
          this.newComponentForm.removeControl('frequency');
        }
        break;
      case '3': {
          this.newComponentForm.removeControl('analogPin');
          this.newComponentForm.removeControl('frequency');
          this.newComponentForm.removeControl('threshold');
      }
        break;
      case '4': {
          this.newComponentForm.removeControl('digitalPin');
      }
        break;
      case '5': {
          this.newComponentForm.removeControl('analogPin');
          this.newComponentForm.removeControl('frequency');
          this.newComponentForm.removeControl('threshold');
      }
        break;
      case '6': {
          this.newComponentForm.removeControl('digitalPin');
          this.newComponentForm.removeControl('rotation');
          this.newComponentForm.removeControl('startAt');
          this.newComponentForm.removeControl('minRange');
          this.newComponentForm.removeControl('maxRange');
      }
        break;
      default:
        break;
    }
  }
}
