import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Residence } from './../residence';

@Component({
  selector: 'app-residence',
  templateUrl: './residence.component.html',
  styleUrls: ['./residence.component.styl']
})
export class ResidenceComponent implements OnInit {

  residence: Residence;
  data: any;

  constructor(
    private _route: ActivatedRoute,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    const { _id, url, description, rooms, boards } = this._route.snapshot.data['residence'];
    this.residence = new Residence(description, url, _id, rooms, boards);
    if (_id) {
      this._localStorageService.saveToken('lastEnteredResidence', _id);
    }
  }

}
