import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { SocketIoService } from './../../../../shared/services/socket-io/socket-io.service';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';

import Board from './../../classes/board';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class NewBoardComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _urlCreatorService: UrlCreatorService,
    private _socketIoService: SocketIoService,
    private _topBarEmitter: TopBarEmitter,
    private _remoteService: RemoteService
  ) { }

  newBoardForm: FormGroup;
  warningMessage: string;
  openModal: boolean;
  headerTitle = 'Aviso';
  boards = [{
    value: 1,
    model: 'UNO'
  },
  {
    value: 2,
    model: 'MEGA'
  }];

  ngOnInit() {
    this._topBarEmitter.emitNewRouteTitle('Cadastrar nova placa');
    this.startNewBoardForm();
  }

  startNewBoardForm() {
    this.newBoardForm = this._formBuilder.group({
      description: ['', Validators.required],
      model: ['', Validators.required],
      port: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.newBoardForm.valid) {
      const { description, model, port } = this.newBoardForm.value;
            this._activatedRoute.params
                .subscribe(params => {
                  const { idResidence } = params,
                        board = new Board(description, model, port),
                        url = this._urlCreatorService.createUrl('boards', 'new', { idResidence });
                  this.createBoard(url, board);
                });
    }
  }
  createBoard(url: string, board: Board) {
    this._remoteService
        .postResources(url, board)
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 201) {
            const { _id } = response.json()['Board'];
            board.Id = _id;
            this._socketIoService
                .emitMessage('board:Create', board, (created) => {
                  if (created) {
                    const warningMessage = `Placa '${board.Description}' criada com sucesso!`;
                    this.onOpenModal(warningMessage);
                  }
                });
          }
        }, error => console.error(error));
  }

  onOpenModal(warningMessage: string) {
    this.warningMessage = warningMessage;
    this.openModal = true;
  }

  onCloseModal(event) {
    this.warningMessage = '';
    this.openModal = event;
  }
}
