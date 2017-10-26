import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CardEmitter } from './../../../../emitters/card.emitter';

@Component({
  selector: 'card-back-right',
  templateUrl: './card-back-right.component.html',
  styleUrls: [
    '../../card.component.styl',
    './card-back-right.component.styl'
  ]
})
export class CardBackRightComponent implements OnInit {

  @Input() isOpen: boolean = true;
  @Output() flippedTo: EventEmitter<string> = new EventEmitter();

  constructor(

  ) { }

  ngOnInit() {

  }

  flipTo(position) {
    this.flippedTo.emit(position);
  }

}
