import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SocketIoService } from './../../../shared/services/socket-io/socket-io.service';

@Component({
  selector: 'servo',
  templateUrl: './servo.component.html',
  styleUrls: ['./servo.component.styl']
})
export class ServoComponent implements OnInit {

  @Input() component;
  flipTo: string;
  private componentSubscription: Subscription;

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.startSubscription();
    console.log(this.component);
  }

  startSubscription() {
    this.componentSubscription =
      this._socketIoService.listenToEvent(`updateState:Component`)
          .subscribe(component => {
            this.component.position = component['id'] === this.component.id ? component['position'] : this.component.position;
          });
  }

  flipToRight(event) {
    this.flipTo = 'right';
  }

  flipToLeft(event) {
    this.flipTo = 'left';
  }

  unflip() {
    this.flipTo = '';
  }

  onRangeChange(event) {
    console.log(event);
    this._socketIoService
        .emitMessage(`updateState:Component`, {
          id: this.component.id,
          position: event.target.valueAsNumber
        });
  }

}
