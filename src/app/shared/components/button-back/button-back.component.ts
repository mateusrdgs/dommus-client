import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.styl']
})
export class ButtonBackComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  ngOnInit() {
  }

  goBack() {
    this._location.back();
  }

}
