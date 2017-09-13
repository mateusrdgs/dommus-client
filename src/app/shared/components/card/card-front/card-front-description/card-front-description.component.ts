import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front-description',
  templateUrl: './card-front-description.component.html',
  styleUrls: ['./card-front-description.component.styl'],
})
export class CardFrontDescriptionComponent implements OnInit {

  @Input() componentType = 0;
  @Input() componentDescription = '';
  @Input() componentMinRange = 0;
  @Input() componentMaxRange = 0;
  @Input() componentPosition = 0;

  constructor() { }

  ngOnInit() {
  }

  onRangeChange(event) {
    const { target } = event;
    console.log(target.valueAsNumber);
  }

}
