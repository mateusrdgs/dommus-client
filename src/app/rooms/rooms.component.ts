import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Room } from './room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.styl']
})
export class RoomsComponent implements OnInit {

  rooms: Room[];

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rooms = this._route.snapshot.data['rooms'];
  }

}
