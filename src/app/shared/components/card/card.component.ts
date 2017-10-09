import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { CardEmitter } from './../../emitters/card.emitter';
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
  flippedTo: string;
  detectedMotion = false;

  constructor(
    private _cardEmitter: CardEmitter,
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.startFlipSubscription();
    this.startStateSubscription();
  }

  startFlipSubscription() {
    this.componentFlipSubscription =
      this._cardEmitter.cardEventEmitter
          .subscribe(data => {
            const { id, side } = data;
            this.flippedTo = this.component['id'] === id ? side : '';
          });
  }

  startStateSubscription() {
    switch (this.component.type) {
      case 1: {
        this.componentSubscription =
          this._socketIoService.listenToEvent(`state:Component`)
            .subscribe(data => {
              this.component.isOn = data['id'] === this.component.id ? data['isOn'] : this.component.isOn;
            });
        break;
      }
      case 2: {
        this.componentSubscription =
          this._socketIoService.listenToEvent(`data:${ this.component.id }`)
            .subscribe(data => {
              this.component.position = data['id'] === this.component.id ? data['position'] : this.component.position;
            });
        break;
      }
      case 3:
      case 5: {
        this.componentSubscription =
        this._socketIoService.listenToEvent(`data:${ this.component.id }`)
            .subscribe(data => {
              console.log(data);
              this.component.position = data['id'] === this.component.id ? data['value'] : this.component.value;
            });
        break;
      }
      case 4: {
        this.componentSubscription =
        this._socketIoService.listenToEvent(`motion:${ this.component.id }`)
            .subscribe(data => {
              this.detectedMotion = data['id'] === this.component.id ? data['detectedMotion'] : this.detectedMotion;
            });
        break;
      }
      case 6: {
        this.componentSubscription =
          this._socketIoService.listenToEvent(`state:Component`)
            .subscribe(data => {
              this.component.position = data['id'] === this.component.id ? data['position'] : this.component.position;
            });
        break;
      }
    }
  }

  changeState(event: Event) {
    if (this.component.type === 1) {
      const { target } = event,
            classList = target['classList'][0],
            containsDescription = this.componentClassIncludes(classList, 'description');
      if (containsDescription) {
            this._socketIoService.emitMessage('state:Component', {
              id: this.component.id, isOn: !this.component.isOn
            });
      }
    } else {
      return false;
    }
  }

  componentClassIncludes(classList: string, searchString: string) {
    return classList !== undefined && classList.includes(searchString);
  }

}
