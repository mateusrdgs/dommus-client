import { Component, Input, OnInit } from '@angular/core';

import { CardEmitter } from './../../../../emitters/card.emitter';

@Component({
  selector: 'card-back-right',
  templateUrl: './card-back-right.component.html',
  styleUrls: [
    '../../card.component.styl',
    '../card-back.component.styl',
    './card-back-right.component.styl'
  ]
})
export class CardBackRightComponent implements OnInit {

  @Input() isOpen: boolean;

    constructor(
      private _cardEmitter: CardEmitter
    ) { }

    unflipCard() {
      this._cardEmitter.cardEventEmitter.emit('');
    }

    ngOnInit() {
    }

}
