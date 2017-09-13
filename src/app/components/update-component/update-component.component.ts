import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { validateSet } from '../validators/setValidator';

@Component({
  selector: 'app-update-component',
  templateUrl: './update-component.component.html',
  styleUrls: ['./update-component.component.styl']
})
export class UpdateComponentComponent implements OnInit {

  updateComponentForm: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._activatedRoute.data
    .subscribe(data => {
      const { boards, component } = data;
      this.startUpdateComponentForm(boards, component);
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
          this.updateComponentForm.addControl('digitalPin', new FormControl('', validateSet(board['digitalPins'])));
        break;
      case '2':
          this.updateComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
          this.updateComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
        break;
      case '3':
        this.updateComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
        this.updateComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
        this.updateComponentForm.addControl('threshold', new FormControl('', [Validators.required]));
      break;
      case '4':
          this.updateComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
        break;
      case '5':
          this.updateComponentForm.addControl('analogPin', new FormControl('', [Validators.required]));
          this.updateComponentForm.addControl('frequency', new FormControl('', [Validators.required]));
          this.updateComponentForm.addControl('threshold', new FormControl('', [Validators.required]));
        break;
      case '6':
          this.updateComponentForm.addControl('digitalPin', new FormControl('', [Validators.required]));
          this.updateComponentForm.addControl('rotation', new FormControl('', [Validators.required]));
          this.updateComponentForm.addControl('startAt', new FormControl('', [Validators.required]));
          this.updateComponentForm.addControl('minRange', new FormControl('', [Validators.required]));
          this.updateComponentForm.addControl('maxRange', new FormControl('', [Validators.required]));
        break;
    }
  }

}
