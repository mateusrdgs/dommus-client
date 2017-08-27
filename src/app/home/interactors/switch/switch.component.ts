import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SocketIoService } from './../../../shared/services/socket-io.service';

@Component({
  selector: 'switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.styl']
})
export class SwitchComponent implements OnInit {

  @Input() component;
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

  changeState() {
    this._socketIoService.emitMessage('updateState:Component', {
      id: this.component.id, isOn: !this.component.isOn
    });
  }

}
