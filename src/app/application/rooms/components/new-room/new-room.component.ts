import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';

import Room from '../../classes/room';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class NewRoomComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _remoteService: RemoteService,
    private _topBarEmitter: TopBarEmitter,
    private _urlCreatorService: UrlCreatorService
  ) { }

  room: Room;
  newRoomForm: FormGroup;
  warningMessage: string;
  openModal: boolean;
  headerTitle = 'Aviso';

  ngOnInit() {
    this._topBarEmitter.emitNewRouteTitle('Cadastrar nova dependência');
    this.startNewRoomForm();
  }

  startNewRoomForm() {
    this.newRoomForm = this._formBuilder.group({
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.newRoomForm.valid) {
      this._activatedRoute.params
          .subscribe(params => {
            const { idResidence } = params,
                  { description } = this.newRoomForm.value,
                  url = this._urlCreatorService.createUrl('rooms', 'new', { idResidence });
            this.room = new Room(description);
            this.createRoom(url, this.room);
          });
    }
  }

  createRoom(url: string, room: Room) {
    this._remoteService
        .postResources(url, room)
        .subscribe(response => {
          if (response.status === 201) {
            const warningMessage = `${room.Description} cadastrado com sucesso!`;
            this.onOpenModal(warningMessage);
          }
        }, error => console.error(error));
  }

  onOpenModal(warningMessage: string) {
    this.warningMessage = warningMessage;
    this.openModal = true;
  }

  onCloseModal(event) {
    this.warningMessage = '';
    this.openModal = event;
  }

}
