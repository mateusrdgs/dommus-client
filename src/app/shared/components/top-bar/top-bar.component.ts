import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SideBarService } from './../../services/side-bar.service';
import { TopBarEmitter } from './../../emitters/top-bar.emitter';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.styl']
})
export class TopbarComponent implements OnInit, OnDestroy {

  @Input() currentTitle: '';
  protected titleSubscription: Subscription;
  private isMenuOpen = false;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _sidebarService: SideBarService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.titleSubscription =
      this._topbarEmitter
          .titleEmitter
          .subscribe(title => {
            this.currentTitle = title;
            this._cdr.detectChanges();
          });
  }

  ngOnDestroy() {
    //this.titleSubscription.unsubscribe();
  }

}
