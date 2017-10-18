import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SocketIoService } from './../../../shared/services/socket-io/socket-io.service';

@Component({
  selector: 'motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.styl']
})
export class MotionComponent implements OnInit {

  isActive = false;

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
          .listenToEvent(`motion:${this.component.id}`)
          .subscribe(data => {
            this.isActive = data['detectedMotion'];
          });
  }

}
