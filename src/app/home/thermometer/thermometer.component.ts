import { SocketIoService } from './../../shared/services/socket-io.service';
import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.styl']
})
export class ThermometerComponent implements OnInit {

  @Input() component;
  private thermometerSubscription: Subscription;

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    this.thermometerSubscription =
      this._socketIoService
          .listenToEvent(`changed:${this.component.id}`)
          .subscribe(data => console.log(data));
  }

}
