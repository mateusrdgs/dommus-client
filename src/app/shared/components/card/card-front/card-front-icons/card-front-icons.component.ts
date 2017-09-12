import { Component, Input, OnInit } from '@angular/core';

import { CardEmitter } from './../../../../emitters/card.emitter';

@Component({
  selector: 'card-front-icons',
  templateUrl: './card-front-icons.component.html',
  styleUrls: ['../../card.component.styl', './card-front-icons.component.styl'],
})
export class CardFrontIconsComponent implements OnInit {

  @Input() componentId = '';

  constructor(
    private _cardEmitter: CardEmitter
  ) { }

  ngOnInit() {
  }

  flipTo(side) {
    this._cardEmitter.cardEventEmitter.emit({ id: this.componentId, side });
  }

}
