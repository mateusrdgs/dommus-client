import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ComponentsService } from './../../services/components.service';
import { SocketIoService } from './../../../shared/services/socket-io/socket-io.service';

import { validateSet } from '../../validators/setValidator';
import { availableOrEqualValidator } from '../../validators/availableOrEqualValidator';

import Switch from '../../classes/switch';
import Thermometer from './../../classes/thermometer';
import Light from '../../classes/light';
import Motion from '../../classes/motion';
import Sensor from '../../classes/sensor';
import Servo from '../../classes/servo';

@Component({
  selector: 'update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.styl']
})
export class UpdateComponentComponent implements OnInit {

  private _routeSubscription: Subscription;
  private _idResidence: string;
  private _idRoom: string;
  updateComponentForm: FormGroup;
  component: any;
  boards: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _componentsService: ComponentsService,
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this._activatedRoute.data
        .subscribe(data => {
          const { boards, component } = data;
          this.boards = boards;
          this.component = component;
          this.getResidenceRouteParams();
          this.startUpdateComponentForm(boards, component);
        });
  }

  getResidenceRouteParams() {
    this._routeSubscription =
      this._activatedRoute.params
        .subscribe((params: any) => {
          this._idResidence = params['idResidence'];
          this._idRoom = params['idRoom'];
        });
  }

  startUpdateComponentForm(boards: any, component: any): void {
    const { description } = component,
          board = boards.filter(_board => _board._id === component.idBoard)[0];
      this.updateComponentForm = this._formBuilder.group({
        description: [description, Validators.required],
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
    this.updateComponent(this._idResidence, this._idRoom, updatedComponent);
  }

  createThermometer(formValue) {
    const { description, componentType, board, analogPin, frequency, controller } = formValue,
          updatedComponent = new Thermometer(board._id, description, 2, controller, analogPin, frequency, this.component._id);
    this.updateComponent(this._idResidence, this._idRoom, updatedComponent);
  }

  createLight(formValue) {
    const { description, componentType, board, analogPin, threshold, frequency, controller } = formValue,
          updatedComponent = new Light(board._id, description, 3, controller, analogPin, frequency, threshold, this.component._id);
    this.updateComponent(this._idResidence, this._idRoom, updatedComponent);
  }

  createMotion(formValue) {
    const { description, componentType, board, digitalPin } = formValue,
          updatedComponent = new Motion(board._id, description, 4, digitalPin);
    this.updateComponent(this._idResidence, this._idRoom, updatedComponent);
  }

  createSensor(formValue) {
    const { description, componentType, board, analogPin, frequency, controller, threshold } = this.updateComponentForm.value,
          updatedComponent = new Sensor(board._id, description, 5, analogPin, frequency, controller, threshold, this.component._id);
    this.updateComponent(this._idResidence, this._idRoom, updatedComponent);
  }

  createServo(formValue) {
    const { description, componentType, board, digitalPin, rotation, startAt, minRange, maxRange } = this.updateComponentForm.value,
          updatedComponent = new Servo(board._id, description, 6, digitalPin, rotation, startAt, minRange, maxRange, this.component._id);
    this.updateComponent(this._idResidence, this._idRoom, updatedComponent);
  }

  updateComponent(_idResidence: string, _idRoom: string, component: any) {
    this._componentsService
        .updateComponent(_idResidence, _idRoom, component)
        .then(response => {
          if (response['_id']) {
            this._socketIoService.emitMessage('update:Component', response);
          }
        })
        .catch(error => console.error(error));
  }

}
