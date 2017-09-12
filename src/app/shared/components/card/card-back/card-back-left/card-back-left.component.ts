import { Component, Input, OnInit } from '@angular/core';

import { CardEmitter } from './../../../../emitters/card.emitter';

@Component({
  selector: 'card-back-left',
  templateUrl: './card-back-left.component.html',
  styleUrls: [
    '../../card.component.styl',
    '../card-back.component.styl',
    './card-back-left.component.styl'
  ],
})
export class CardBackLeftComponent implements OnInit {

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
