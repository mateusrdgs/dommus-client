import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ComponentsService } from './../../services/components.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';
import { SocketIoService } from './../../../shared/services/socket-io/socket-io.service';
import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';

import { validateSet } from '../../validators/setValidator';
import { availableOrEqualValidator } from '../../validators/availableOrEqualValidator';

import Switch from '../../classes/switch';
import Thermometer from './../../classes/thermometer';
import Light from '../../classes/light';
import Motion from '../../classes/motion';
import Sensor from '../../classes/sensor';
import Servo from '../../classes/servo';
import Board from '../../../boards/classes/board';

@Component({
  selector: 'update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.styl']
})
export class UpdateComponentComponent implements OnInit {

  private _routeSubscription: Subscription;
  routeParams: any;
  updateComponentForm: FormGroup;
  component: any;
  boards: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _componentsService: ComponentsService,
    private _formBuilder: FormBuilder,
    private _urlCreator: UrlCreatorService,
    private _remoteService: RemoteService,
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.extractRouteParams();
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['component'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            this.component = this.extractDataFromRawComponent(response.json()['Component']);
          }
        });
    this._activatedRoute.data
        .map(response => response['boards'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            this.boards = this.iterateOverBoards( response.json()['Boards']);
          }
        });
    this.startUpdateComponentForm(this.boards, this.component);
  }

  extractDataFromRawComponent(component: any) {
    const { type } = component;
      switch (type) {
        case '1': {
          const { description, digitalPin, idBoard, _id } = component;
          return new Switch(idBoard, description, digitalPin, type, _id);
        }
        case '2': {
          const { description, analogPin, frequency, idBoard, _id } = component;
          return new Thermometer(idBoard, description, type, '', analogPin, frequency, _id);
        }
        case '3': {
          const { description, analogPin, frequency, threshold, idBoard, _id } = component;
          return new Light(idBoard, description, type, '', analogPin, frequency, threshold, _id);
        }
        case '4': {
          const { description, digitalPin, idBoard, _id } = component;
          return new Motion(idBoard, description, type, digitalPin, _id);
        }
        case '5': {
          const { description, analogPin, frequency, threshold, idBoard, _id } = component;
          return new Sensor(idBoard, description, type, analogPin, frequency, '', threshold, _id);
        }
        case '6': {
          const { description, digitalPin, startAt, minRange, maxRange, idBoard, _id } = component;
          return new Servo(idBoard, description, type, digitalPin, startAt, minRange, maxRange, _id);
        }
      };
  }

  iterateOverBoards(boards: Array<any>): Array<Board> {
    return boards.map(board => {
      const { _id, model, description, port, digitalPins, analogPins } = board;
      return new Board(description, model, port, analogPins, digitalPins, _id);
    });
  }

  extractRouteParams() {
    this._activatedRoute.params
        .subscribe(params => {
          const idResidence = params;
          const idRoom = params;
          this.routeParams = { idResidence, idRoom };
    });
  }

  startUpdateComponentForm(boards: any, component: any): void {
    const { Description } = component,
          board = boards.filter(_board => _board.Id === component.idBoard)[0];
      this.updateComponentForm = this._formBuilder.group({
        description: [Description, Validators.required],
        board: [board, Validators.required]
      });
      this.createControls(board, component);
  }

  createControls(board: any, component: any): void {
    const { type } = component;
    switch (type) {
      case '1':
      case '4': {
          this.updateComponentForm
              .addControl('digitalPin',
                new FormControl(
                  component.digitalPin, [availableOrEqualValidator(component.digitalPin, board['digitalPins'])]
              ));
        break;
      }
      case '2': {
          this.updateComponentForm
              .addControl('analogPin',
                new FormControl(
                  component.digitalPin, [availableOrEqualValidator(component.digitalPin, board['analogPins'])]
              ));
          this.updateComponentForm.addControl('frequency', new FormControl(component.frequency, [Validators.required]));
        break;
      }
      case '3':
      case '5': {
          this.updateComponentForm
              .addControl('analogPin',
                new FormControl(
                  component.digitalPin, [availableOrEqualValidator(component.digitalPin, board['analogPins'])]
              ));
          this.updateComponentForm.addControl('frequency', new FormControl(component.frequency, [Validators.required]));
          this.updateComponentForm.addControl('threshold', new FormControl(component.threshold, [Validators.required]));
        break;
      }
      case '6': {
          this.updateComponentForm
              .addControl('digitalPin',
                new FormControl(
                  component.digitalPin, [availableOrEqualValidator(component.digitalPin, board['digitalPins'])]
              ));
          this.updateComponentForm.addControl('rotation', new FormControl(component.range[1], [Validators.required]));
          this.updateComponentForm.addControl('startAt', new FormControl(component.startAt, [Validators.required]));
          this.updateComponentForm.addControl('minRange', new FormControl(component.range[0], [Validators.required]));
          this.updateComponentForm.addControl('maxRange', new FormControl(component.range[1], [Validators.required]));
        break;
      }
    }
  }

  onSubmit() {
    if (this.updateComponentForm.valid) {
      const type = this.component.type;
      switch (type) {
        case '1': {
          this.createSwitch(this.updateComponentForm.value);
        }
        break;
        case '2': {
          this.createThermometer(this.updateComponentForm.value);
        }
        break;
        case '3': {
          this.createLight(this.updateComponentForm.value);
        }
        break;
        case '4': {
          this.createMotion(this.updateComponentForm.value);
        }
        break;
        case '5': {
          this.createSensor(this.updateComponentForm.value);
        }
        break;
        case '6': {
          this.createServo(this.updateComponentForm.value);
        }
        break;
        default:
          return;
      }
    }
  }

  createSwitch(formValue) {
    const { description, componentType, board, digitalPin } = formValue,
          updatedComponent = new Switch(board._id, description, digitalPin, 1, this.component._id);
    this.updateComponent(updatedComponent);
  }

  createThermometer(formValue) {
    const { description, componentType, board, analogPin, frequency, controller } = formValue,
          updatedComponent = new Thermometer(board._id, description, 2, controller, analogPin, frequency, this.component._id);
    this.updateComponent(updatedComponent);
  }

  createLight(formValue) {
    const { description, componentType, board, analogPin, threshold, frequency, controller } = formValue,
          updatedComponent = new Light(board._id, description, 3, controller, analogPin, frequency, threshold, this.component._id);
    this.updateComponent(updatedComponent);
  }

  createMotion(formValue) {
    const { description, componentType, board, digitalPin } = formValue,
          updatedComponent = new Motion(board._id, description, 4, digitalPin);
    this.updateComponent(updatedComponent);
  }

  createSensor(formValue) {
    const { description, componentType, board, analogPin, frequency, controller, threshold } = this.updateComponentForm.value,
          updatedComponent = new Sensor(board._id, description, 5, analogPin, frequency, controller, threshold, this.component._id);
    this.updateComponent(updatedComponent);
  }

  createServo(formValue) {
    const { description, componentType, board, digitalPin, startAt, minRange, maxRange } = this.updateComponentForm.value,
          updatedComponent = new Servo(board._id, description, 6, digitalPin, startAt, minRange, maxRange, this.component._id);
    this.updateComponent(updatedComponent);
  }

  updateComponent(component: any) {
    const url = this._urlCreator.createUrl('components', 'id', this.routeParams);
    this._remoteService
        .putResources(url, component)
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status >= 200) {
            this._socketIoService
                .emitMessageWithReturn('update:Component', 'updated:Component', component)
                .subscribe(updated => {
                  if (updated) {
                    console.log('Updated!');
                  } else {
                    console.error('Error!');
                  }
                }, error => console.error(error))
                .unsubscribe();
          }
        }, error => console.error(error));
  }

}
