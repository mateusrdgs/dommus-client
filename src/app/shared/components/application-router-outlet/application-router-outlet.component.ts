import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './../../services/auth/auth.service';
import { TopBarEmitter } from './../../emitters/top-bar.emitter';
import { TitleService } from './../../services/title/title.service';
import { SyncService } from './../../services/sync/sync.service';
import { SocketIoEmitter } from './../../emitters/socket-io.emitter';
import { SocketIoService } from './../../services/socket-io/socket-io.service';
import { SideBarService } from './../../services/side-bar/side-bar.service';
import { ResidenceEmitter } from './../../emitters/residence.emitter';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';


import Thermometer from '../../../components/classes/thermometer';
import Switch from '../../../components/classes/switch';
import Light from '../../../components/classes/light';
import Motion from '../../../components/classes/motion';
import Servo from '../../../components/classes/servo';
import Residence from '../../../residences/classes/residence';
import Board from '../../../boards/classes/board';
import Room from '../../../rooms/classes/room';

@Component({
  selector: 'application-router-outlet',
  templateUrl: './application-router-outlet.component.html',
  styleUrls: ['./application-router-outlet.component.styl']
})
export class ApplicationRouterOutletComponent implements OnInit, OnDestroy {

  public isSidebarOpen = false;
  public isUserLoggedIn: boolean;
  private _routeSubscription: Subscription;
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

    this.startRouteSubscription();
    this.startTopBarSubscription();
    this.startSideBarSubscription();

    if (this.isUserLoggedIn) {
      const data = this._localStorageService.getDecodedToken('currentResidence');
      if (data !== '') {
        this.connectToLocalModule(data);
      }
    }
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
        .subscribe(event => this._titleService.setTitle(event['title']));
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
          .listenToEvent('sync:App')
          .subscribe((callback: any) => {
            this._syncService
                .syncApps(idResidence)
                .then(residence => {
                  residence = this.iterateOverResidence(residence);
                  callback(residence);
                });
        });
  }

  iterateOverResidence(residence: any): Residence {
    const { description, url, rooms, boards, _id } = residence;
    return new Residence(description, url, _id, this.iterateOverRooms(rooms), this.iterateOverBoards(boards));
  }

  iterateOverBoards(boards: any): Board[] {
    return boards.map(board => {
      const { _id, model, description, port, digitalPins, analogPins } = board;
      return new Board(description, model, port, analogPins, digitalPins, _id);
    });
  }

  iterateOverRooms(rooms: any): Room[] {
    return rooms.map(room => {
      const { description, _id, components } = room;
      return new Room(description, _id, this.iterateOverComponents(components));
    });
  }

  iterateOverComponents(components: any) {
    return components.map(component => {
      const { type } = component;
      switch (component.type) {
        case '1': {
          return this.returnSwitch(component);
        }
        case '2': {
          return this.returnLight(component);
        }
        case '3': {
          return this.returnLight(component);
        }
        case '4': {
          return this.returnMotion(component);
        }
        case '5': {
          console.log(component);
          break;
        }
        case '6': {
          return this.returnServo(component);
        }
      }
    });
  }

  returnSwitch(component: any): Switch {
    const { _id, description, type, digitalPin, idBoard } = component;
    return new Switch(idBoard, description, digitalPin, type, _id);
  }

  returnThermometer(component: any): Thermometer {
    const { _id, description, type, analogPin, frequency, idBoard } = component;
    return new Thermometer(idBoard, description, type, 'LM35', analogPin, frequency, _id);
  }

  returnLight(component: any): Light {
    const { _id, description, type, analogPin, frequency, threshold, idBoard } = component;
    return new Light(idBoard, description, type, 'DEFAULT', analogPin, frequency, threshold, _id);
  }

  returnMotion(component: any): Motion {
    const { _id, description, type, digitalPin, idBoard } = component; {
      return new Motion(idBoard, description, type, digitalPin, _id);
    }
  }

  returnServo(component: any): Servo {
    const { _id, description, type, digitalPin, startAt, range, idBoard } = component;
    return new Servo(idBoard, description, type, digitalPin, startAt, range[0], range[1], _id);
  }

  ngOnDestroy() {
    this._topbarSubscription.unsubscribe();
    this._socketIoSubscription.unsubscribe();
    this._sidebarSubscription.unsubscribe();
    this._enteredResidenceSubscription.unsubscribe();
    this._syncSubscription.unsubscribe();
    this._routeSubscription.unsubscribe();
  }

}
