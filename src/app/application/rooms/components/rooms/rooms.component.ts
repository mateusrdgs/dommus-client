import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Room from './../../classes/room';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.styl']
})
export class RoomsComponent implements OnInit {

  rooms: Array<Room>;
  message = 'Loading...';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Rooms');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['rooms'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const rooms = response.json()['Rooms'];
            this.rooms = this.iterateOverRooms(rooms);
          } else {
            if (response.hasOwnProperty('Message')) {
              this.message = response['Message'];
            }
          }
        }, error => {
          console.log(error);
        });
  }

  iterateOverRooms(rooms: Array<any>): Array<Room> {
    return rooms.map(room => {
      const { description, _id, components } = room;
      return new Room(description, _id, components);
    });
  }

}
