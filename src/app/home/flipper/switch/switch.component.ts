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
  
  }

}
