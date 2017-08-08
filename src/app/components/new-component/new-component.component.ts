import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { BoardsService } from './../../boards/boards.service';
import { ComponentsService } from './../components.service';

import Switch from '../classes/switch';
import Sensor from '../classes/sensor';
import Servo from '../classes/servo';
import { validateSet } from '../validators/setValidator';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.styl']
})
export class NewComponentComponent implements OnInit {

  private _previousFormType = 1;
  private _routeSubscription: Subscription;
  private _idResidence: string;
  private _idRoom: string;
  private _component;

  newComponentForm: FormGroup;
  firstBoardName: string;
  residenceBoards = [];

  componentAllowed = [{
    value: 1,
    type: 'Switch'
  },
  {
    value: 2,
    type: 'Sensor'
  },
  {
    value: 3,
    type: 'Servo'
  }];

  constructor(
    private _formBuilder: FormBuilder,
    private _componentsService: ComponentsService,
    private _route: ActivatedRoute
  ) { }

  getResidenceRouteParams() {
    this._routeSubscription =
    this._route.params.subscribe((params: any) => {
      this._idResidence = params['idResidence'];
      this._idRoom = params['idRoom'];
    });
  }

  ngOnInit() {
    this.residenceBoards = this._route.snapshot.data.boards;
    this.getResidenceRouteParams();
    this.createNewComponentForm(this._previousFormType);
    this.createControls(this._previousFormType);
    if (this.residenceBoards.length) {
      this.firstBoardName = this.residenceBoards[0].description;
    }
  }

  createNewComponentForm(nextFormType: number) {
    this.newComponentForm = this._formBuilder.group({
      description: ['', Validators.required],
      componentType: [nextFormType, Validators.required],
      board: [this.residenceBoards[0], Validators.required]
    });
  }

  onChange() {
    let { componentType } = this.newComponentForm.value;
    componentType = parseInt(componentType, 10);
    this.removeControls(this._previousFormType);
    this.createControls(componentType);
    this._previousFormType = componentType;
  }

  onSubmit() {
    if (this.newComponentForm.valid) {
      const { componentType } = this.newComponentForm.value;
      switch (componentType) {
        case 1: {
          this.createSwitch(this.newComponentForm.value);
        }
        break;
        case 2: {
          this.createSensor(this.newComponentForm.value);
        }
        break;
        case 3: {
          this.createServo(this.newComponentForm.value);
        }
        break;
        default:
          return;
      }
    }
  }

  createSwitch(formValue) {
    const { description, componentType, board, digitalPin } = formValue;
    const { _id } = board;
    this._component = new Switch(_id, description, componentType, digitalPin);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  createSensor(formValue) {
    const { description, componentType, board, analogPin, frequency } = this.newComponentForm.value;
    const { _id } = board;
    this._component = new Sensor(_id, description, componentType, analogPin, frequency);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  createServo(formValue) {
    const { description, componentType, board, digitalPin, rotation, minRange, maxRange } = this.newComponentForm.value;
    const { _id } = board;
    this._component = new Servo(_id, description, componentType, digitalPin, rotation, minRange, maxRange);
    this.saveNewComponent(this._idResidence, this._idRoom, this._component);
  }

  saveNewComponent(_idResidence: string, _idRoom: string, component: any) {
    this._componentsService
        .createComponent(_idResidence, _idRoom, component)
        .then(response => console.log(response.Component));
  }

  createControls(nextFormType) {
    switch (nextFormType) {
      case 1:
          this.newComponentForm.addControl('digitalPin', new FormControl('', validateSet(this.residenceBoards[0]['digitalPins'])));
        break;
      case 2:
          this.newComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
        break;
      case 3:
          this.newComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('rotation', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('minRange', new FormControl('', [Validators.required]));
          this.newComponentForm.addControl('maxRange', new FormControl('', [Validators.required]));
        break;
    }
  }

  removeControls(previousFormType) {
    switch (previousFormType) {
      case 1:
          this.newComponentForm.removeControl('digitalPin');
        break;
      case 2:
          this.newComponentForm.removeControl('analogPin');
          this.newComponentForm.removeControl('frequency');
        break;
      case 3:
          this.newComponentForm.removeControl('digitalPin');
          this.newComponentForm.removeControl('rotation');
          this.newComponentForm.removeControl('minRange');
          this.newComponentForm.removeControl('maxRange');
        break;
    }
  }
}
