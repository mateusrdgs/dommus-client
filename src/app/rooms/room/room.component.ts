import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Room } from './../room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.styl']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { _id, description, components } = this._route.snapshot.data['room']['Room'];
    this.room = new Room(description, _id, components);
  }

}
