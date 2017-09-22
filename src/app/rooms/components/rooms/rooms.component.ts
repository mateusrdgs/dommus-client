import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

import Room from './../../classes/room';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.styl']
})
export class RoomsComponent implements OnInit {

  rooms;

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
          if (response.status === 200) {
            this.rooms = response.json()['Rooms'];
          } else {
            console.log('error');
          }
        }, error => {
          console.log(error);
        })
        .unsubscribe();
  }

}
