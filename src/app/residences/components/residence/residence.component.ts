import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from './../../../shared/services/local-storage/local-storage.service';
import { ResidenceEmitter } from './../../../shared/emitters/residence.emitter';
import { SocketIoService } from './../../../shared/services/socket-io/socket-io.service';

import Residence from './../../classes/residence';
import Board from '../../../boards/classes/board';
import Room from '../../../rooms/classes/room';

@Component({
  selector: 'residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.styl']
})
export class ResidenceComponent implements OnInit {

  residence: Residence;
  data: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _residenceEmitter: ResidenceEmitter,
    private _socketIoService: SocketIoService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
    .map(response => response['residence'])
    .subscribe(response => {
      if (response.status === 200) {
        const { description, url, _id, rooms, boards } = response.json()['Residence'];
        console.log(rooms);
        this.residence = new Residence(description, url, _id, rooms, this.iterateOverBoards(boards));
        if (_id) {
          const token = { id: _id, url };
          this._residenceEmitter.enteredResidence.emit(_id);
          this.saveResidenceDataOnLocalStorage(_id, url);
          this.tryToConnectToLocalModule(url);
          this._topbarEmitter.emitNewRouteTitle(this.residence.Description);
        }
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    })
    .unsubscribe();
  }

  saveResidenceDataOnLocalStorage(id: string, url: string) {
    this._localStorageService.encodeAndSaveToken('currentResidence', JSON.stringify({ id, url }));
  }

  tryToConnectToLocalModule(url: string) {
    this._socketIoService
        .checkLocalModuleConnectionState(url)
        .then(connected => {
          console.log(connected);
        })
        .catch(error => {
          console.error(error);
        });
  }

  iterateOverBoards(boards: any): Array<Board> {
    return boards.map(board => {
      const { _id, port, model, digitalPins, description, analogPins } = board;
      return new Board(description, model, port, analogPins, digitalPins, _id);
    });
  }

  iterateOverRooms(rooms: any): Array<Room> {
    return rooms.map(room => {
      const { _id, description, components } = room;
      return new Room(description, _id, components);
    });
  }

  iterateOverComponents(components: any): Array<any> {
    return components.map(component => component);
  }
}
