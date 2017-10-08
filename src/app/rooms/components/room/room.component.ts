import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Room from './../../classes/room';

import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

import Switch from '../../../components/classes/switch';

@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.styl']
})
export class RoomComponent implements OnInit {

  room: Room;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
    .map(response => response['room'])
    .subscribe(response => {
      if (response.hasOwnProperty('status') && response.status === 200) {
        const room = response.json()['Room'],
              { description, _id, components } = room;
        this.room = new Room(description, _id, components);
        this._topBarEmitter.emitNewRouteTitle(description);
        console.log(this.iterateOverComponents(components))
      } else {
        console.error(response);
      }
    }, error => {
      console.error(error);
    });
  }

  iterateOverComponents(components: any) {
    return components.map(component => {
      const { type } = component;
      switch (type) {
        case '1': {
            const { description, idBoard, digitalPin, _id } = component;
          return new Switch(idBoard, description, digitalPin, type, _id);
        }
      };
    });
  }

}
