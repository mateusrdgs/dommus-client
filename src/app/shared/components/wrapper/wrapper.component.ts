import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SideBarService } from './../../services/side-bar.service';

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.styl']
})
export class WrapperComponent implements OnInit, OnDestroy {

  sidebarSubscription: Subscription;
  isSidebarOpen = false;

  constructor(
    private _sidebarService: SideBarService
  ) { }

  ngOnInit() {
    this.sidebarSubscription
       = this._sidebarService
             .sideBarEventEmitter
             .subscribe(data => {
               this.isSidebarOpen = data;
              });
  }

  ngOnDestroy() {
    this.sidebarSubscription.unsubscribe();
  }

}
