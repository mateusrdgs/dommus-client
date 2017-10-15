import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SocketIoService } from './../../services/socket-io/socket-io.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent implements OnInit {

  @Input() component;
  private componentFlipSubscription: Subscription;
  private componentSubscription: Subscription;
  flippedTo: boolean;

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.startStateSubscription();
  }

  startStateSubscription() {
    switch (this.component.type) {
      case 1: {
        this.componentSubscription =
          this._socketIoService.listenToEvent(`component:State`)
            .subscribe(data => {
              this.component.isOn = data['id'] === this.component.id ? data['isOn'] : this.component.isOn;
            });
        break;
      }
      case 2: {
        this.componentSubscription =
          this._socketIoService.listenToEvent(`data:${ this.component.id }`)
            .subscribe(data => {
              this.component.data = data['id'] === this.component.id ?
                { celsius: data['celsius'], fahrenheit: data['fahrenheit'] } : this.component.data;
            });
        break;
      }
      case 3:
      case 5: {
        this.componentSubscription =
        this._socketIoService.listenToEvent(`data:${ this.component.id }`)
            .subscribe(data => {
              this.component.data = data['id'] === this.component.id ?
                { value: data['value'] } : this.component.data;
            });
        break;
      }
      case 4: {
        this.componentSubscription =
        this._socketIoService.listenToEvent(`motion:${ this.component.id }`)
            .subscribe(data => {
              this.component.data = data['id'] === this.component.id ?
                { detectedMotion: data['detectedMotion'] } : this.component.data;
            });
        break;
      }
      case 6: {
        this.componentSubscription =
          this._socketIoService.listenToEvent(`component:State`)
            .subscribe(data => {
              this.component.position = data['id'] === this.component.id ? data['position'] : this.component.position;
            });
        break;
      }
    }
  }

  flipTo(event) {
    this.flippedTo = event;
  }

  onStateChange(event) {
    this._socketIoService
        .emitMessage(`component:State`, {
          id: this.component.id,
          isOn: event.isOn
        });
  }

  onPositionChange(event) {
    this._socketIoService
        .emitMessage(`component:State`, {
          id: this.component.id,
          position: event.position
    });
  }

}
