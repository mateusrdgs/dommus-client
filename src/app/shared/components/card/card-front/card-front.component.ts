import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['../card.component.styl', '../card.component.styl']
})
export class CardFrontComponent implements OnInit {

  @Input() component;
  @Output() flippedTo: EventEmitter<string> = new EventEmitter();
  @Output() stateChange: EventEmitter<any> = new EventEmitter();
  @Output() positionChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  flipTo(event) {
    this.flippedTo.emit(event);
  }

  onStateChange(event) {
    this.stateChange.emit(event);
  }

  onPositionChange(event) {
    console.log(this.component.minRange);
    this.positionChange.emit(event);
  }

}
