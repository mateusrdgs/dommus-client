import { AfterContentInit, ChangeDetectorRef, Component, OnInit, OnChanges } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../../services/auth.service';
import { ResidenceEmitter } from './../../emitters/residence.emitter';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.styl']
})
export class SideMenuComponent implements OnInit, AfterContentInit {

  private _enteredResidenceSubscription: Subscription;
  _id: string;
  idResidence: string;

  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _residenceEmitter: ResidenceEmitter
  ) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
    this.getIdAccount();
    this.idResidence = this._authService.getToken('lastEnteredResidence');
    if (this.idResidence === '') {
      this.startResidenceSubscription();
    }
  }

  getIdAccount() {
    this._id = this._authService.getDataFromToken('_id');
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
