import { LocalStorageService } from './shared/services/local-storage/local-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { TitleService } from './shared/services/title/title.service';
import { TopBarEmitter } from './shared/emitters/top-bar.emitter';
import { routeAnimation } from './shared/animations/route.animation';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [routeAnimation],
  host: { '[@routeAnimation]': '' }
})
export class AppComponent implements OnInit, OnDestroy {

  private _routeSubscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _titleService: TitleService,
    private _topbarEmitter: TopBarEmitter
  ) {

  }

  startRouteSubscription() {
    this._routeSubscription =
      this._router.events
        .filter((event) => {
          return event instanceof NavigationEnd;
        })
        .map(() => {
          return this._activatedRoute;
        })
        .map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter((route) => {
          return route.outlet === 'primary';
        })
        .mergeMap((route) => {
          return route.data;
        })
        .subscribe(event => {
          this._titleService.setTitle(event['title']);
        });
  }


  ngOnInit() {
    this.startRouteSubscription();
  }

  ngOnDestroy() {
    this._routeSubscription.unsubscribe();
    //this._localStorageService.removeToken('Dommus_User');
  }

}
