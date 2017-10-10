import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-front-container-range',
  templateUrl: './card-front-container-range.component.html',
  styleUrls: ['./card-front-container-range.component.styl']
})
export class CardFrontContainerRangeComponent implements OnInit {

  @Input() maxRange;
  @Input() minRange;
  @Input() position;
  @Output() positionChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onPositionChange(event) {
    const { valueAsNumber } = event.target;
    this.positionChange.emit({ position: valueAsNumber });
  }

}
