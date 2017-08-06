import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Board } from './../board';
import { BoardsService } from './../boards.service';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.styl']
})
export class NewBoardComponent implements OnInit {

  newBoardForm: FormGroup;
  idResidence: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _boardsService: BoardsService
  ) { }

  ngOnInit() {
    this.newBoardForm = this._formBuilder.group({
      description: ['', Validators.required],
      model: ['', [Validators.required, Validators.min(1), Validators.max(2)]],
      port: ['', Validators.required]
    });
    this.idResidence = this._route.snapshot.params['idResidence'];
  }

  onSubmit() {
    if (this.newBoardForm.valid) {
      const { description, model, port } = this.newBoardForm.value;
      this._boardsService.createBoard(this.idResidence, description, model, port)
                         .then(response => console.log(response))
                         .catch(error => console.error(error));
    }
  }
}
