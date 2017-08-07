import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.styl']
})
export class NewComponentComponent implements OnInit {

  private previousFormType = '0';
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

  boardsAllowed = [
    {
      value: 1,
      model: 'UNO'
    },
    {
      value: 2,
      model: 'MEGA'
    }
  ];

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const nextFormType = this.componentAllowed[0].value;
    const boardsInitialValue = this.boardsAllowed[0].value;
    this.newComponentForm = this._formBuilder.group({
      description: ['', Validators.required],
      componentType: [nextFormType, Validators.required],
      boardModel: [boardsInitialValue, Validators.required]
    });
    this.onChange();
    this.previousFormType = '1';
  }

  onChange() {
    let { componentType } = this.newComponentForm.value;
    componentType = componentType.toString();
    this.removeControls(this.previousFormType);
    this.createControls(componentType);
    this.previousFormType = componentType;
  }

  onSubmit() {
    console.log(this.newComponentForm.value);
  }

  createControls(nextFormType) {
    switch (nextFormType) {
      case '1':
        this.newComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
      break;
      case '2':
        this.newComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
      break;
      case '3':
        this.newComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('rotation', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('minRange', new FormControl('', [Validators.required]));
        this.newComponentForm.addControl('maxRange', new FormControl('', [Validators.required]));
      break;
    }
  }

  removeControls(previousFormType) {
     switch (previousFormType) {
      case '1':
        this.newComponentForm.removeControl('digitalPin');
      break;
      case '2':
        this.newComponentForm.removeControl('analogPin');
        this.newComponentForm.removeControl('frequency');
      break;
      case '3':
        this.newComponentForm.removeControl('digitalPin');
        this.newComponentForm.removeControl('rotation');
        this.newComponentForm.removeControl('minRange');
        this.newComponentForm.removeControl('maxRange');
      break;
    }
  }
}
