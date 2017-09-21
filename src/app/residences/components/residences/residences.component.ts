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

  residences;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Residences');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['residences'])
        .subscribe(response => {
          if (response.status === 200) {
            this.residences = response.json()['Residences'];
          } else {
            console.log('error');
          }
        }, error => {
          console.log(error);
        })
        .unsubscribe();
  }

}
