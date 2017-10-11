import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { CardEmitter } from './../../../../emitters/card.emitter';

@Component({
  selector: 'card-front-icons',
  templateUrl: './card-front-icons.component.html',
  styleUrls: ['../../card.component.styl', './card-front-icons.component.styl'],
})
export class CardFrontIconsComponent implements OnInit {

  @Input() id: string;
  @Input() type: number;
  @Output() flippedTo: EventEmitter<string> = new EventEmitter();

  constructor(
    private _cardEmitter: CardEmitter
  ) { }

  ngOnInit() {
  }

  flipTo(side) {
    this.flippedTo.emit(side);
  }

}
