import { AfterContentInit, ChangeDetectorRef, Component, OnInit, OnChanges } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { LocalStorageService } from './../../services/local-storage/local-storage.service';
import { ResidenceEmitter } from './../../emitters/residence.emitter';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.styl']
})
export class SideBarComponent implements OnInit, AfterContentInit {

  private _enteredResidenceSubscription: Subscription;
  _id: string;
  idResidence: string;

  constructor(
    private _localStorageService: LocalStorageService,
    private _cdr: ChangeDetectorRef,
    private _residenceEmitter: ResidenceEmitter
  ) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.getIdAccount();
    this.idResidence = this._localStorageService.getTokenPropertyValue('currentResidence', 'id', false);
    if (this.idResidence === '') {
      this.startResidenceSubscription();
    }
  }

  getIdAccount() {
    this._id = this._localStorageService.getTokenPropertyValue('Dommus', '_id', true);
  }

  startResidenceSubscription() {
    this._enteredResidenceSubscription =
      this._residenceEmitter
          .enteredResidence
          .subscribe(idResidence => {
            this.idResidence = idResidence;
            this._cdr.detectChanges();
          });
  }

}