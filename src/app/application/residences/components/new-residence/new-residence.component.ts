import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { ResidencesService } from './../../services/residences.service';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';

import Residence from './../../classes/residence';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'new-residence',
  templateUrl: './new-residence.component.html',
  styleUrls: ['./new-residence.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class NewResidenceComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _residencesService: ResidencesService,
    private _remoteService: RemoteService,
    private _topBarEmitter: TopBarEmitter,
    private _urlCreatorService: UrlCreatorService
  ) { }

  newResidenceForm: FormGroup;
  warningMessage: string;
  openModal: boolean;
  headerTitle = 'Aviso';

  ngOnInit() {
    this._topBarEmitter.emitNewRouteTitle('Cadastrar nova residência');
    this.startNewResidenceForm();
  }

  startNewResidenceForm() {
    this.newResidenceForm = this._formBuilder.group({
      description: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.newResidenceForm.valid) {
      const { description, url } = this.newResidenceForm.value,
            residence = new Residence(description, url),
            _url = this._urlCreatorService.createUrl('residences', 'new');
      this.createResidence(_url, residence);
    }
  }

  createResidence(url: string, residence: Residence) {
    this._remoteService
        .postResources(url, residence)
        .subscribe(response => {
          if (response.status === 201) {
            const message = `${residence.Description} cadastrado com sucesso!`;
            this.onOpenModal(message);
          }
        }, error => console.error(error));
  }

  onOpenModal(message: string) {
    this.openModal = true;
    this.warningMessage = message;
  }

  onCloseModal(event) {
    this.openModal = event;
  }



}
