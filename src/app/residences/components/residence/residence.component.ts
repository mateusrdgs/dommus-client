import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from './../../../shared/services/local-storage/local-storage.service';
import { ResidenceEmitter } from './../../../shared/emitters/residence.emitter';

import Residence from './../../classes/residence';

@Component({
  selector: 'residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.styl']
})
export class ResidenceComponent implements OnInit {

  residence: Residence;
  data: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _residenceEmitter: ResidenceEmitter,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Residences');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
    .map(response => response['residence'])
    .subscribe(response => {
      if (response.status === 200) {
        const { description, url, _id, rooms, boards } = response.json()['Residence'];
        this.residence = new Residence(description, url, _id, rooms, boards);
        if (_id) {
          const token = { id: _id, url };
          this._localStorageService.encodeAndSaveToken('currentResidence', JSON.stringify({ id: _id, url }));
          this._residenceEmitter.enteredResidence.emit(_id);
        }
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    })
    .unsubscribe();
  }
}
