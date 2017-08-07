import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { BoardsService } from './../../boards/boards.service';
import { ComponentsService } from './../components.service';

import Switch from '../classes/switch';
import Sensor from '../classes/sensor';
import Servo from '../classes/servo';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.styl']
})
export class NewComponentComponent implements OnInit {

  private previousFormType = 1;
  private _routeSubscription: Subscription;
  private idResidence: string;
  private idRoom: string;

  residenceBoards = [];
  newComponentForm: FormGroup;

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
        this.idResidence = params['idResidence'];
        this.idRoom = params['idRoom'];
    });
  }

  ngOnInit() {
    this.residenceBoards = this._route.snapshot.data.boards;
    this.getResidenceRouteParams();
    this.createNewComponentForm(this.previousFormType);
    this.createControls(this.previousFormType);
  }

  createNewComponentForm(nextFormType: number) {
    this.newComponentForm = this._formBuilder.group({
      description: ['', Validators.required],
      componentType: [nextFormType, Validators.required],
      board: [nextFormType, Validators.required]
    });
  }

  onChange() {
    let { componentType } = this.newComponentForm.value;
    componentType = parseInt(componentType, 10);
    this.removeControls(this.previousFormType);
    this.createControls(componentType);
    this.previousFormType = componentType;
  }

  onSubmit() {
    if(this.newComponentForm.valid) {
      const { componentType } = this.newComponentForm.value;
      console.log(this.newComponentForm.value, this.idResidence, this.idRoom);
    }
    // this._componentsService.createComponent(this.idResidence, this.idRoom);
  }

  createControls(nextFormType) {
    switch (nextFormType) {
      case 1:
        this.newComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
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
