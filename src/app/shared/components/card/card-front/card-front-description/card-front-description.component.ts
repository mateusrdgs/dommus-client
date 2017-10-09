import { Component, Input, OnInit } from '@angular/core';

import { SocketIoService } from './../../../../services/socket-io/socket-io.service';

@Component({
  selector: 'card-front-description',
  templateUrl: './card-front-description.component.html',
  styleUrls: ['../../card.component.styl', './card-front-description.component.styl'],
})
export class CardFrontDescriptionComponent implements OnInit {

  @Input() componentId = '';
  @Input() componentType = 0;
  @Input() componentDescription = '';
  @Input() componentMinRange = 0;
  @Input() componentMaxRange = 0;
  @Input() componentPosition = 0;

  constructor(
    private _socketIoService: SocketIoService
  ) { }

  ngOnInit() {
  }

  onRangeChange(event) {
    const { valueAsNumber } = event.target;
    this._socketIoService.emitMessage('state:Component', {
      id: this.componentId, position: valueAsNumber
    });
  }

}
