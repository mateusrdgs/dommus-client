import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './shared/services/auth/auth.service';
import { ResidenceEmitter } from './shared/emitters/residence.emitter';
import { SideBarService } from './shared/services/side-bar/side-bar.service';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';
import { SocketIoEmitter } from './shared/emitters/socket-io.emitter';
import { SocketIoService } from './shared/services/socket-io/socket-io.service';
import { SyncService } from './shared/services/sync/sync.service';
import { TitleService } from './shared/services/title/title.service';
import { TopBarEmitter } from './shared/emitters/top-bar.emitter';

import { Residence } from './residences/residence';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit, OnDestroy {

  public isSidebarOpen = false;
  public isUserLoggedIn: boolean;
  // private _routeSubscription: Subscription;
  private _idResidence: string;
  private _topbarSubscription: Subscription;
  private _enteredResidenceSubscription: Subscription;
  private _socketIoSubscription: Subscription;
  private _syncSubscription: Subscription;
  private _sidebarSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _localStorageService: LocalStorageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _residenceEmitter: ResidenceEmitter,
    private _sidebarService: SideBarService,
    private _socketIoEmitter: SocketIoEmitter,
    private _socketIoService: SocketIoService,
    private _syncService: SyncService,
    private _titleService: TitleService,
    private _topbarEmitter: TopBarEmitter
  ) {

  }

  ngOnInit() {
    this.isUserLoggedIn =
      this._authService
          .isLoggedIn('Dommus');

    this.startTopBarSubscription();
    this.startSideBarSubscription();

    if (this.isUserLoggedIn) {
      const data = this._localStorageService.getDecodedToken('currentResidence');
      if (data !== '') {
        this.connectToLocalModule(data);
      }
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

  startTopBarSubscription() {
    this._topbarSubscription =
      this._topbarEmitter
          .stateEmitter
          .subscribe(isUserLoggedIn => {
            this.isUserLoggedIn = isUserLoggedIn;
          });
  }

  connectToLocalModule(data: any) {
    const { id, url } = data;
    this._socketIoService
        .checkLocalModuleConnectionState(url)
        .then(connectionEstablished => {
          if (connectionEstablished) {
            this.startEnteredResidenceSubscription(id);
          }
        })
        .catch(err => console.log(err));
  }

  startSideBarSubscription() {
    this._sidebarSubscription =
      this._sidebarService
        .sideBarEventEmitter
        .subscribe(data => this.isSidebarOpen = data);
  }

  startEnteredResidenceSubscription(idResidence: string) {
    if (idResidence) {
      this.startSyncSubscription(idResidence);
    }
  }

  startSyncSubscription(idResidence: string) {
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

  ngOnDestroy() {
    this._topbarSubscription.unsubscribe();
    this._socketIoSubscription.unsubscribe();
    this._sidebarSubscription.unsubscribe();
    this._enteredResidenceSubscription.unsubscribe();
    this._syncSubscription.unsubscribe();
    // this._routeSubscription.unsubscribe();
  }

}
