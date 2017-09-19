import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResidencesService } from './../residences.service';

import { Residence } from './../residence';

@Component({
  selector: 'update-residence',
  templateUrl: './update-residence.component.html',
  styleUrls: ['./update-residence.component.styl']
})
export class UpdateResidenceComponent implements OnInit {

  residence: Residence;
  updateResidenceForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _residencesService: ResidencesService
  ) { }

  ngOnInit() {
    const { _id, description, url, rooms, boards  } = this._route.snapshot.data['residence'];
    this.residence = new Residence(description, url, _id, rooms, boards);
    this.createUpdateResidenceForm(this.residence);
  }

  createUpdateResidenceForm(residence: Residence) {
    this.updateResidenceForm = this._formBuilder.group({
      description: [residence.Description, Validators.required],
      url: [residence.Url, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateResidenceForm.valid) {
      const { description, url } = this.updateResidenceForm.value;
      const { Id, Rooms, Boards } = this.residence;
      const updatedResidence = new Residence(description, url, Id, Rooms, Boards);
      this._residencesService.updateResidence(updatedResidence);
    }
  }

}
