import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';
import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';

import Board from './../../classes/board';

@Component({
  selector: 'update-board',
  templateUrl: './update-board.component.html',
  styleUrls: ['./update-board.component.styl']
})
export class UpdateBoardComponent implements OnInit {

  board: Board;
  updateBoardForm: FormGroup;
  updateBoardSubscription: Subscription;

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
    private _formBuilder: FormBuilder,
    private _remoteService: RemoteService,
    private _socketIoService: SocketIoService,
    private _topBarEmitter: TopBarEmitter,
    private _urlCreatorService: UrlCreatorService,
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
            this._topBarEmitter.emitNewRouteTitle(`Atualizar ${this.board.Description}`);
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
      this.updateBoardProperties(this.board, description, port);
      this.updateBoard(this.board);
    }
  }

  updateBoardProperties(board: Board, description: string, port: number) {
    board.Description = description;
    board.Port = port;
  }

  updateBoard(board: Board) {
    this._activatedRoute.params
        .subscribe(params => {
          const { idResidence, idBoard } = params;
          const url = this._urlCreatorService.createUrl('boards', 'id', { idResidence, idBoard });
          this._remoteService
              .putResources(url, board)
              .subscribe(response => {
                if (response.hasOwnProperty('status') && response.status === 200) {
                  this._socketIoService
                      .emitMessage('board:Update', board, (updated) => {
                        if (updated) {
                          console.log(updated);
                        }
                      });
                }
              }, error => {
                console.error(error);
              });
        }).unsubscribe();
  }

}
