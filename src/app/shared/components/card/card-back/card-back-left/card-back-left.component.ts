import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  @Input() id: string;
  @Input() isOpen: boolean;
  @Output() flippedTo: EventEmitter<string> = new EventEmitter();

  constructor(
    private _cardEmitter: CardEmitter
  ) { }

  flipTo(position) {
    this.flippedTo.emit(position);
  }

  ngOnInit() {

  }

}
