import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';
import 'rxjs/add/operator/catch';
import Residence from './../../classes/residence';

@Component({
  selector: 'residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.styl']
})
export class ResidencesComponent implements OnInit {

  residences: Residence[];

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
          if (response.hasOwnProperty('status') && response.status === 200) {
            const residences = response.json()['Residences'];
            this.residences = this.iterateOverResidences(residences);
          } else {
            console.error(response);
          }
        }, error => console.error(error));
  }

  iterateOverResidences(residences: any): Array<Residence> {
    return residences.map(residence => {
      const { _id, url, description, boards, rooms } = residence;
      return new Residence(description, url, _id, rooms, boards);
    });
  }

}
