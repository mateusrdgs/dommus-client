import { Residence } from './residences/residence';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './shared/services/auth.service';
import { ResidenceEmitter } from './shared/emitters/residence.emitter';
import { SideBarService } from './shared/services/side-bar.service';
import { SocketIoService } from './shared/services/socket-io.service';
import { SyncService } from './shared/services/sync.service';
import { TitleService } from './shared/services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, OnDestroy {

  public isSidebarOpen = false;
  public isUserLoggedIn: boolean;
  // private _routeSubscription: Subscription;
  private _idResidence: string;
  private _enteredResidenceSubscription: Subscription;
  private _syncSubscription: Subscription;
  private _sidebarSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _residenceEmitter: ResidenceEmitter,
    private _sidebarService: SideBarService,
    private _socketIoService: SocketIoService,
    private _syncService: SyncService,
    private _titleService: TitleService
  ) {

  }

  ngOnInit() {
    this.isUserLoggedIn =
      this._authService
          .isLoggedIn('dommusRemote');

    if (this.isUserLoggedIn) {
        this._sidebarSubscription =
          this._sidebarService
              .sideBarEventEmitter
              .subscribe(data => this.isSidebarOpen = data);
          this._enteredResidenceSubscription =
            this._residenceEmitter
                .enteredResidence
                .subscribe(idResidence => {
                  if (idResidence.length > 0) {
                    this._syncSubscription =
                      this._socketIoService
                        .listenToEvent('app:Sync')
                        .subscribe((callback: any) => {
                          this._syncService
                              .syncApps(idResidence)
                              .then(residence => {
                                callback(residence);
                              });
                        });
                  }
                });
    }
          /*this._routeSubscription =
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

          });*/
  }

  ngOnDestroy() {
    this._sidebarSubscription.unsubscribe();
    this._enteredResidenceSubscription.unsubscribe();
    this._syncSubscription.unsubscribe();
    // this._routeSubscription.unsubscribe();
  }

}
