import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SideBarService } from './../../services/side-bar.service';
import { TopBarEmitter } from './../../emitters/top-bar.emitter';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.styl']
})
export class TopbarComponent implements OnInit, OnDestroy {

  protected title = '';
  protected titleSubscription: Subscription;
  private isMenuOpen = false;

  constructor(
    private _sidebarService: SideBarService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.titleSubscription =
      this._topbarEmitter
          .titleEmitter
          .subscribe(title => this.title = title);
  }

  ngOnDestroy() {
    this.titleSubscription.unsubscribe();
  }

}
