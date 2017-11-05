import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
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

import Thermometer from './../../../shared/classes/thermometer';
import Switch from '../../../shared/classes/switch';
import Light from '../../../shared/classes/light';
import Motion from '../../../shared/classes/motion';
import Servo from '../../../shared/classes/servo';
import Residence from '../../../application/residences/classes/residence';
import Board from '../../../application/boards/classes/board';
import Room from '../../../application/rooms/classes/room';

@Component({
  selector: 'application-router-outlet',
  templateUrl: './application-router-outlet.component.html',
  styleUrls: ['./application-router-outlet.component.styl']
})
export class ApplicationRouterOutletComponent implements OnInit, OnDestroy {

  public isSidebarOpen = false;
  public isUserLoggedIn: boolean;
  private _idResidence: string;
  private _topbarSubscription: Subscription;
  private _enteredResidenceSubscription: Subscription;
  private _socketIoSubscription: Subscription;
  private _syncSubscription: Subscription;
  private _sidebarSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _cdr: ChangeDetectorRef,
    private _localStorageService: LocalStorageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _residenceEmitter: ResidenceEmitter,
    private _sidebarService: SideBarService,
    private _socketIoEmitter: SocketIoEmitter,
    private _socketIoService: SocketIoService,
    private _syncService: SyncService,
    private _topbarEmitter: TopBarEmitter
  ) {

  }

  ngOnInit() {
    this.isUserLoggedIn =
      this._authService
          .isLoggedIn('Dommus_Token');

    this.startTopBarSubscription();
    this.startSideBarSubscription();

    if (this.isUserLoggedIn) {
      const residenceToken = this._localStorageService.getDecodedToken('Dommus_Residence'),
            userToken = this._localStorageService.getDecodedToken('Dommus_User');
      if (residenceToken !== '' && userToken !== '') {
        this.connectToLocalModule(residenceToken, userToken);
      }
    }
  }

  startTopBarSubscription() {
    this._topbarSubscription =
      this._topbarEmitter
          .stateEmitter
          .subscribe(isUserLoggedIn => {
            this.isUserLoggedIn = isUserLoggedIn;
          });
  }

  connectToLocalModule(residenceToken: any, userToken) {
    const { id, url } = residenceToken,
          idUser  = userToken['id'];
    this._socketIoService
        .checkLocalModuleConnectionState(url, idUser)
        .then(connectionEstablished => {
          if (connectionEstablished) {
            this.startEnteredResidenceSubscription(id);
            this._socketIoSubscription =
              this._socketIoService
                  .listenToEvent('duplicated_connection')
                  .subscribe(message => {
                    if (message === 'User already connected!') {
                      alert(message);
                      this._router.navigate(['login', 'users']);
                    }
                  });
          }
        })
        .catch(err => alert(err));
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
                .subscribe(response => {
                  if (response.hasOwnProperty('status') && response.status === 200) {
                    const residence = response.json()['Residence'];
                    callback(this.iterateOverResidence(residence));
                  }
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
    const { _id, description, type, digitalPin, idBoard, command } = component;
    return new Switch(idBoard, description, digitalPin, command, type, _id);
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
    const { _id, description, type, digitalPin, startAt, range, idBoard, command } = component;
    return new Servo(idBoard, description, type, digitalPin, startAt, range[0], range[1], command, _id);
  }

  ngOnDestroy() {
    this._topbarSubscription.unsubscribe();
    this._sidebarSubscription.unsubscribe();
    if (this._syncSubscription) {
      this._syncSubscription.unsubscribe();
    }
    if (this._socketIoSubscription) {
      this._socketIoSubscription.unsubscribe();
    }
  }

}
