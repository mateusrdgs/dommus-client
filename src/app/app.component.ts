import { Residence } from './residences/residence';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from './shared/services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, OnDestroy {

  private _routeSubscription: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _titleService: TitleService
  ) {

  }

  ngOnInit() {
    /*
    this._routeSubscription =
      this._router.events
          .filter(event => event instanceof NavigationEnd)
          .map(() => this._activatedRoute)
          .map(route => {
            while (route.firstChild) {
              route = route.firstChild;
            };
            return route;
          })
          .filter(route => route.outlet === 'primary')
          .mergeMap(route => route.data)
          .subscribe(event => {

          });
    */
  }

  ngOnDestroy() {
    this._routeSubscription.unsubscribe();
  }

}
