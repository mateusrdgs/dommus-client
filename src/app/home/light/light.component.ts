import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SocketIoService } from './../../shared/services/socket-io.service';

@Component({
  selector: 'light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.styl']
})
export class LightComponent implements OnInit {

  @Input() component;
  private thermometerSubscription: Subscription;
  private showCelsius = true;

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    this.thermometerSubscription =
      this._socketIoService.listenToEvent(`data:${this.component.id}`)
          .subscribe(data => {
            this.component.value = data['value'];
          });
  }
}
