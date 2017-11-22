import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from './../../../../shared/services/auth/auth.service';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Board from '../../classes/board';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.styl']
})
export class BoardsComponent implements OnInit {

  boards: Array<Board>;
  message = 'Loading...';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topBarEmitter.emitNewRouteTitle('Placas');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['boards'])
        .subscribe(response => {
          const userIsAdmin = this._authService.checkUserPermission('Dommus_User');
          if (response.hasOwnProperty('status') && response.status === 200) {
            const boards = response.json()['Boards'];
            if (userIsAdmin) {
              this.boards =
                this.iterateOverBoards(boards)
                  .concat([{ isntItem: true, routePath: '', description: 'Cadastrar nova placa' }]);
            } else {
              this.boards =
                this.iterateOverBoards(boards);
            }
          } else {
            if (userIsAdmin) {
              this.boards =
                this.iterateOverBoards([])
                      .concat([{ isntItem: true, routePath: '', description: 'Cadastrar nova placa' }]);
              } else {
                this.boards = this.iterateOverBoards([]);
              }
          }
        });
  }

  iterateOverBoards(boards: any[]): any {
    return boards.map(board => {
      const { _id, model, description, port, digitalPins, analogPins } = board;
      return new Board(description, model, port, analogPins, digitalPins, _id);
    });
  }

}
