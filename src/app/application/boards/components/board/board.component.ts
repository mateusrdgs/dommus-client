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
  chunksAnalogPins;
  chunksDigitalPins;

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
            this.board = new Board(description, model, port, analogPins, digitalPins, _id);
            this.chunksAnalogPins = this.splitArrayIntoChunks(5, this.board.AnalogPins);
            this.chunksDigitalPins = this.splitArrayIntoChunks(10, this.board.DigitalPins);
            this._topBarEmitter.emitNewRouteTitle(this.board.Description);
          } else {
            console.error(response);
          }
        }, error => console.error(error))
        .unsubscribe();
  }

  splitArrayIntoChunks(chunkSize: number, array: Array<number>) {
    return array.map((chunk, index) => index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null)
                       .filter(isArray => isArray);
  }

}
