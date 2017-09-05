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
  private showCelsius = true;

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
    this.startSubscription();
  }

  startSubscription() {
    console.log(this.component);
    this.thermometerSubscription =
      this._socketIoService
          .listenToEvent(`changed:${this.component.id}`)
          .subscribe(data => {
            this.component.celsius = data['celsius'];
            this.component.fahrenheit = data['fahrenheit'];
          });
  }

  changeTemperatureScale() {
    this.showCelsius = !this.showCelsius;
  }

}
