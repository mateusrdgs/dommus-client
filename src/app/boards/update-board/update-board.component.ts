import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.styl']
})
export class UpdateBoardComponent implements OnInit {

  board: any;
  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //this.board = this._activatedRoute.snapshot.data['board'];
  }

}
