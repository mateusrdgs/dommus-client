import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Residence } from './../residence';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.styl']
})
export class ResidenceComponent implements OnInit {

  residence: Residence;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.residence = this._route.snapshot.data['residence'];
  }

}
