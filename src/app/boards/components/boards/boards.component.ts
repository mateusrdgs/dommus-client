import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.styl']
})
export class BoardsComponent implements OnInit {

  boards = [];

  constructor(
    private _route: ActivatedRoute,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    const { boards } = this._route.snapshot.data;
    this.boards = boards;
    this._topBarEmitter.emitNewRouteTitle('Boards');
  }

}
