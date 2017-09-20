import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Board from './../../classes/board';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.styl']
})
export class BoardComponent implements OnInit {

  board: Board;
  chunksAnalogPins;
  chunksDigitalPins;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { board } = this._route.snapshot.data;
    if (board) {
      const { description, model, port, analogPins, digitalPins, _id } = board;
      this.board = new Board(description, model, port, analogPins, digitalPins, _id);
      this.chunksAnalogPins = this.splitArrayIntoChunks(5, this.board.AnalogPins);
      this.chunksDigitalPins = this.splitArrayIntoChunks(10, this.board.DigitalPins);
    }
  }

  splitArrayIntoChunks(chunkSize: number, array: Array<number>) {
    return array.map((chunk, index) => index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null)
                       .filter(isArray => isArray);
  }

}
