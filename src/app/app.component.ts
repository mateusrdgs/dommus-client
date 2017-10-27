import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { TitleService } from './shared/services/title/title.service';
import { TopBarEmitter } from './shared/emitters/top-bar.emitter';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, OnDestroy {

  private _routeSubscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _titleService: TitleService,
    private _topbarEmitter: TopBarEmitter
  ) {

  }

  startRouteSubscription() {
    this._routeSubscription =
      this._router.events
        .filter(event => event instanceof NavigationEnd)
        .map(() => this._activatedRoute)
        .map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .subscribe(event => {
          this._titleService.setTitle(event['title']);
        });
  }


  ngOnInit() {
    this.startRouteSubscription();
  }

  ngOnDestroy() {
    this._routeSubscription.unsubscribe();
  }

}
