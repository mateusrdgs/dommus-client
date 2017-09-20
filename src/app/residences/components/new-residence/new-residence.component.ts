import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResidencesService } from './../../services/residences.service';
import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

import Residence from './../../classes/residence';

@Component({
  selector: 'new-residence',
  templateUrl: './new-residence.component.html',
  styleUrls: ['./new-residence.component.styl']
})
export class NewResidenceComponent implements OnInit {

  newResidenceForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _residencesService: ResidencesService,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.newResidenceForm = this._formBuilder.group({
      description: ['', Validators.required],
      url: ['', Validators.required]
    });
    this._topBarEmitter.emitNewRouteTitle('Create residence');
  }

  onSubmit() {
    const values = this.newResidenceForm.value;
    const newResidence = new Residence(values['description'], values['url']);
    this._residencesService
        .createResidence(newResidence)
        .then(response => console.log(response))
        .catch(error => console.error(error));
  }

}
