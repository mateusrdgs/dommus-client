import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-front-container',
  templateUrl: './card-front-container.component.html',
  styleUrls: ['./card-front-container.component.styl']
})
export class CardFrontContainerComponent implements OnInit {

  @Input() data;
  @Input() description;
  @Input() isOn;
  @Input() maxRange;
  @Input() minRange;
  @Input() position;
  @Input() type;
  @Output() stateChange: EventEmitter<any> = new EventEmitter();
  @Output() positionChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    if (this.type === 1) {
      this.isOn = !this.isOn;
      this.stateChange.emit({ isOn: this.isOn });
    }
  }

  onPositionChange(event) {
    this.positionChange.emit(event);
  }

}
