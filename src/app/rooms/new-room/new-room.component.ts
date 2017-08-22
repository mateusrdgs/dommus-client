import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RoomsService } from './../rooms.service';
import { SocketIoService } from './../../shared/services/socket-io.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.styl']
})
export class NewRoomComponent implements OnInit {

  newRoomForm: FormGroup;
  private _routeSubscription: Subscription;
  private _idResidence: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _roomsService: RoomsService,
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.newRoomForm = this._formBuilder.group({
      description: ['', Validators.required]
    });
    this.getIdResidence();
  }

  onSubmit() {
    if (this.newRoomForm.valid) {
      const { description } = this.newRoomForm.value;
      this._roomsService.createRoom(this._idResidence, description)
                        .then(data => {
                          this._socketIoService.emitMessage('create:Room', data);
                        });
    }
  }

  getIdResidence() {
    this._routeSubscription = this._route.params.subscribe((params: any) => {
      this._idResidence = params['idResidence'];
    });
  }

}
