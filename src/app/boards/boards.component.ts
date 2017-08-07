import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.styl']
})
export class BoardsComponent implements OnInit {

  boards = [];

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { boards } = this._route.snapshot.data;
    this.boards = boards;
  }

}
