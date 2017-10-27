import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topBarEmitter.emitNewRouteTitle('Boards');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['boards'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const boards = response.json()['Boards'];
            this.boards = this.iterateOverBoards(boards).concat([{ isntItem: true, routePath: '', description: 'Create a new board' }]);
          } else {
            this.boards =
              this.iterateOverBoards([])
                  .concat([{ isntItem: true, routePath: '', description: 'Create a new board' }]);
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
