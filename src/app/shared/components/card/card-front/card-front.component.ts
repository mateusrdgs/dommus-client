import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['../card.component.styl', '../card.component.styl']
})
export class CardFrontComponent implements OnInit {

  @Input() component;
  @Output() positionChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPositionChange(event) {
    this.positionChange.emit(event);
  }

}
