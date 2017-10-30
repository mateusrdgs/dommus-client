import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-back',
  templateUrl: './card-back.component.html',
  styleUrls: [
    '../card.component.styl',
    './card-back.component.styl'
  ]
})
export class CardBackComponent implements OnInit {

  @Input() id: string;
  @Input() type: string;
  @Input() side: string;
  @Input() isOn: string;
  @Output() flippedTo: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  flipTo(event) {
    this.flippedTo.emit(event);
  }

}
