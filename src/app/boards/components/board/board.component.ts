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
    private _activatedRoute: ActivatedRoute
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
