import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from './../../shared/services/local-storage/local-storage.service';
import { ResidenceEmitter } from './../../shared/emitters/residence.emitter';
import { Residence } from './../residence';

@Component({
  selector: 'residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.styl']
})
export class ResidenceComponent implements OnInit {

  residence: Residence;
  data: any;

  constructor(
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _residenceEmitter: ResidenceEmitter
  ) { }

  ngOnInit() {
    const { _id, url, description, rooms, boards } = this._route.snapshot.data['residence'];
    this.residence = new Residence(description, url, _id, rooms, boards);
    if (_id) {
      const token = { id: _id, url };
      this._localStorageService.encodeAndSaveToken('currentResidence', JSON.stringify({ id: _id, url }));
      this._residenceEmitter.enteredResidence.emit(_id);
    }
  }

}
