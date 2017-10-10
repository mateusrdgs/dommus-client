import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-front-container',
  templateUrl: './card-front-container.component.html',
  styleUrls: ['./card-front-container.component.styl']
})
export class CardFrontContainerComponent implements OnInit {

  @Input() data;
  @Input() description;
  @Input() type;
  @Input() minRange;
  @Input() maxRange;
  @Input() position;
  @Output() positionChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPositionChange(event) {
    this.positionChange.emit(event);
  }

}
