import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import Board from './../../classes/board';
import { BoardsService } from './../../services/boards.service';

import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

@Component({
  selector: 'update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.styl']
})
export class UpdateBoardComponent implements OnInit {

  private _idResidence: string;
  board: Board;
  updateBoardForm: FormGroup;
  boardsAllowed = [{
    value: 1,
    type: 'UNO'
  },
  {
    value: 2,
    type: 'MEGA'
  }];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _boardsService: BoardsService,
    private _formBuilder: FormBuilder,
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
            const board = response.json()['Board'];
            this.board = this.iterateOverProperties(board);
            this.startUpdateBoardForm(this.board);
            this._topBarEmitter.emitNewRouteTitle(this.board.Description);
          }
        });
  }

  iterateOverProperties(board: any): Board {
    const { _id, analogPins, description, digitalPins, model, port } = board;
    return new Board(description, model, port, analogPins, digitalPins, _id);
  }

  startUpdateBoardForm(board: Board): void {
    this.updateBoardForm = this._formBuilder.group({
      description: [board.Description, [Validators.required]],
      port: [board.Port, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.updateBoardForm.valid) {
      const { description, port } = this.updateBoardForm.value;
      this.board.Description = description;
      this.board.Port = port;
      this._boardsService
          .updateBoard(this._idResidence, this.board)
          .then((observable: Observable<any>) => {
            observable.subscribe(response => console.log(response));
          });
    }
  }

}
