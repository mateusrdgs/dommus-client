import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Board from './../../classes/board';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class BoardComponent implements OnInit {

  board: Board;
  chunksAnalogPins: any[];
  chunksDigitalPins: any[];
  title = 'Dados da placa';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['board'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const { description, model, port, analogPins, digitalPins, _id } = response.json()['Board'];
            this.board = this.iterateOverBoard(response.json()['Board']);
            /*this.chunksAnalogPins = this.splitArrayIntoChunks(5, this.board.AnalogPins);
            this.chunksDigitalPins = this.splitArrayIntoChunks(10, this.board.DigitalPins);*/
            this._topBarEmitter.emitNewRouteTitle(this.board.Description);
          } else {
            console.error(response);
          }
        }, error => console.error(error))
        .unsubscribe();
  }

  iterateOverBoard(board: any): Board {
    const { description, model, port, analogPins, digitalPins, _id } = board;
    return new Board(description, model, port, analogPins, digitalPins, _id);
  }

  mapBoardProperties(board: Board) {
    return [
      {
        property: 'Id',
        value: board.Id
      },
      {
        property: 'Modelo',
        value: board.Model
      },
      {
        property: 'Porta',
        value: board.Port
      },
      {
        property: 'Pinos analógicos',
        value: board.AnalogPins
      },
      {
        property: 'Pinos digitais',
        value: board.DigitalPins
      }
    ];
  }

  splitArrayIntoChunks(chunkSize: number, array: Array<number>) {
    return array.map((chunk, index) => index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null)
                       .filter(isArray => isArray);
  }

}
