import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Room from './../../classes/room';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.styl']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activatedRoute.data
        .subscribe(data => {
          const { room } = data;
          this.room = room;
        });
  }

}
