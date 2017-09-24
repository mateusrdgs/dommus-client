import { LocalStorageService } from './../../../shared/services/local-storage/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ResidencesService } from './../../services/residences.service';
import { UrlCreatorService } from './../../../shared/services/url-creator/url-creator.service';
import { RemoteService } from './../../../shared/services/remote/remote.service';

import Residence from './../../classes/residence';

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
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _residencesService: ResidencesService,
    private _urlCreatorService: UrlCreatorService,
    private _remoteService: RemoteService
  ) { }

  ngOnInit() {
    this._activatedRoute.data
        .map(response => response['residence'])
        .subscribe(response => {
          if (response.status === 200) {
            const { _id, description, url, rooms, boards } = response.json()['Residence'];
            this.residence = new Residence(description, url, _id, rooms, boards);
            this.createUpdateResidenceForm(this.residence);
          }
        });
  }

  createUpdateResidenceForm(residence: Residence) {
    this.updateResidenceForm = this._formBuilder.group({
      description: [residence.Description, Validators.required],
      url: [residence.Url, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateResidenceForm.valid) {
      const { description, url } = this.updateResidenceForm.value,
            { Id, Rooms, Boards } = this.residence,
            updatedResidence = new Residence(description, url, Id, Rooms, Boards);
    }
  }

  updateResidence(residence: Residence): void {
    const idResidence = this._localStorageService.getTokenPropertyValue('currentResidence', 'id', false),
          _url = this._urlCreatorService.createUrl('residences', 'id', { idResidence });
    this._remoteService
        .putResources(_url, residence)
        .subscribe(response => {
          if (response.status === 200) {
            console.log(response.json()['Residence']);
          } else {
            console.log(response.json());
          }
        });
  }

}
