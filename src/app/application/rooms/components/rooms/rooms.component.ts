import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { AuthService } from './../../../../shared/services/auth/auth.service';

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
    private _authService: AuthService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Dependências');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['rooms'])
        .subscribe(response => {
          const userIsAdmin = this._authService.checkUserPermission('Dommus_User');
          if (response.hasOwnProperty('status') && response.status === 200) {
            const rooms = response.json()['Rooms'];
            if (userIsAdmin) {
              this.rooms = this.iterateOverRooms(rooms)
                               .concat([{ isntItem: true, routePath: '', description: 'Cadastrar nova dependência' }]);
            } else {
              this.rooms = this.iterateOverRooms(rooms);
            }
          } else {
            if (userIsAdmin) {
              this.rooms =
              this.iterateOverRooms([])
                  .concat([{ isntItem: true, routePath: '', description: 'Cadastrar nova dependência' }]);
            } else {
              this.iterateOverRooms([]);
            }
          }
        }, error => {
          console.log(error);
        });
  }

  iterateOverRooms(rooms: Array<any>): any {
    return rooms.map(room => {
      const { description, _id, components } = room;
      return new Room(description, _id, components);
    });
  }
}
