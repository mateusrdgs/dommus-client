import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Room } from './../../room';
import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.styl']
})
export class RoomsComponent implements OnInit {

  rooms: Room[];

  constructor(
    private _route: ActivatedRoute,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.rooms = this._route.snapshot.data['rooms'];
    this._topbarEmitter.emitNewRouteTitle('Rooms');
  }

}