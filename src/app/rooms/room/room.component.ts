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
