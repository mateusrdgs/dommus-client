import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.styl']
})
export class UpdateRoomComponent implements OnInit {

  updateRoomForm: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  startUpdateRoomForm(roomDescription: string): void {
    this.updateRoomForm = this._formBuilder.group({
      description: [roomDescription, Validators.required]
    });
  }

  ngOnInit() {
    this._activatedRoute.data
        .subscribe(data => {
          const { room } = data;
          this.startUpdateRoomForm(room.description);
        });
  }

}