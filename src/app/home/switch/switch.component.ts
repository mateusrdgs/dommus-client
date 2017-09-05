import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SocketIoService } from './../../shared/services/socket-io.service';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.styl']
})
export class SwitchComponent implements OnInit {

  @Input() component;
  flipTo: string;
  private componentSubscription: Subscription;

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    this.componentSubscription =
      this._socketIoService.listenToEvent('updateState:Component')
          .subscribe(component => {
            this.component.isOn = component['id'] === this.component.id ? component['isOn'] : this.component.isOn;
          });
  }

  changeState(event) {
    const { target } = event;
    if (!target.classList.contains('fa-tasks') && !target.classList.contains('fa-cog')) {
      this._socketIoService.emitMessage('updateState:Component', {
        id: this.component.id, isOn: !this.component.isOn
      });
    }
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

}
