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
        .map(response => response['room'])
        .subscribe(response => {
          if (response.status === 200) {
            this.room = response.json()['Room'];
          }
        });
  }

}
