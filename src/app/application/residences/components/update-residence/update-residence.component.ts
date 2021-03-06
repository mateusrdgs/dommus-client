import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/pairwise';

import { ResidencesService } from './../../services/residences.service';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { LocalStorageService } from './../../../../shared/services/local-storage/local-storage.service';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Residence from './../../classes/residence';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'update-residence',
  templateUrl: './update-residence.component.html',
  styleUrls: ['./update-residence.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class UpdateResidenceComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _localStorageService: LocalStorageService,
    private _urlCreatorService: UrlCreatorService,
    private _remoteService: RemoteService,
    private _residencesService: ResidencesService,
    private _router: Router,
    private _topBarEmitter: TopBarEmitter
  ) { }

  residence: Residence;
  updateResidenceForm: FormGroup;
  warningMessage: string;
  openModal: boolean;
  headerTitle = 'Aviso';

  ngOnInit() {
    this._activatedRoute.data
        .map(response => response['residence'])
        .subscribe(response => {
          if (response.status === 200) {
            const { _id, description, url, rooms, boards } = response.json()['Residence'];
            this.residence = new Residence(description, url, _id, rooms, boards);
            this.createUpdateResidenceForm(this.residence);
            this._topBarEmitter.emitNewRouteTitle(`Atualizar - ${this.residence.Description}`);
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
      this.updateResidence(updatedResidence);
    }
  }

  updateResidence(residence: Residence): void {
    this._activatedRoute.params
        .subscribe(params => {
          const { idResidence } = params;
          const url = this._urlCreatorService.createUrl('residences', 'id', { idResidence });
          this._remoteService
              .putResources(url, residence)
              .subscribe(response => {
                if (response.hasOwnProperty('status') && response.status === 200) {
                  const message = `${residence.Description} atualizado com sucesso!`;
                  this.onOpenModal(message);
                } else {
                  throw response.json();
                }
              }, error => {
                console.error(error);
              });
        })
        .unsubscribe();
  }

  onOpenModal(message: string) {
    this.openModal = true;
    this.warningMessage = message;
  }

  onCloseModal(event) {
    this.openModal = event;
  }

}
