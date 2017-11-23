import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Room from '../../classes/room';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';

@Component({
  selector: 'update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.styl']
})
export class UpdateRoomComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _urlCreatorService: UrlCreatorService,
    private _remoteService: RemoteService,
    private _topBarEmitter: TopBarEmitter,
    private _formBuilder: FormBuilder
  ) { }

  room: Room;
  updateRoomForm: FormGroup;
  warningMessage: string;
  openModal: boolean;
  headerTitle = 'Aviso';

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['room'])
        .subscribe(response => {
          if (response.status === 200) {
            const { _id, description, components } = response.json()['Room'];
              this.room = new Room(description, _id, components);
              this._topBarEmitter.emitNewRouteTitle(`Atualizar ${this.room.Description}`);
              this.startUpdateRoomForm(this.room);
          }
        });
  }

  startUpdateRoomForm(room: Room): void {
    this.updateRoomForm = this._formBuilder.group({
      description: [room.Description, Validators.required]
    });
  }

  onSubmit() {
    if (this.updateRoomForm.valid) {
      this._activatedRoute.params
          .subscribe(params => {
            const { idResidence, idRoom } = params,
                  { description } = this.updateRoomForm.value,
                  url = this._urlCreatorService.createUrl('rooms', 'id', { idResidence, idRoom });
            this.room.Description = description;
            this.updateRoom(url, this.room);
          })
          .unsubscribe();
    }
  }

updateRoom(url: string, room: Room) {
    this._remoteService
        .putResources(url, room)
        .subscribe(response => {
          if (response.status === 200) {
            const warningMessage = `${room.Description} atualizado com sucesso!`;
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
