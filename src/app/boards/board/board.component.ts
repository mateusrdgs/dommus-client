import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Board } from './../board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.styl']
})
export class BoardComponent implements OnInit {

  board: Board;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { board } = this._route.snapshot.data;
    this.board = new Board(board['description'], board['model'], board['port'], board['analogPins'], board['digitalPins'], board['_id']);
  }

}
