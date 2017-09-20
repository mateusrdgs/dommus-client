import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

import Residence from './../../classes/residence';

@Component({
  selector: 'residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.styl']
})
export class ResidencesComponent implements OnInit {

  residences = [];

  constructor(
    private _route: ActivatedRoute,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.residences = this._route.snapshot.data['residences'];
    this._topbarEmitter.emitNewRouteTitle('Residences');
  }

}
