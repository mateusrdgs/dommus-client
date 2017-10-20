import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  idUser: string;

  constructor(
    private _localStorageService: LocalStorageService,
    private _cdr: ChangeDetectorRef,
    private _residenceEmitter: ResidenceEmitter,
    private _router: Router
  ) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.getIdAccount();
    this.idResidence = this._localStorageService.getTokenPropertyValue('Dommus_Residence', 'id', false);
    this.idUser = this._localStorageService.getTokenPropertyValue('Dommus_User', 'id', false);
    if (this.idResidence === '') {
      this.startResidenceSubscription();
    }
  }

  isActive(instruction: any[]): boolean {
    return this._router.isActive(this._router.createUrlTree(instruction), true);
  }

  getIdAccount() {
    this._id = this._localStorageService.getTokenPropertyValue('Dommus_Token', '_id', true);
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
