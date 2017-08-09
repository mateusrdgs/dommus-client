import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Residence } from './residence';

@Component({
  selector: 'app-residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.styl']
})
export class ResidencesComponent implements OnInit {

  residences = [];

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.residences = this._route.snapshot.data['residences'];
  }

}
