import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'card-front-container-range',
  templateUrl: './card-front-container-range.component.html',
  styleUrls: ['./card-front-container-range.component.styl']
})
export class CardFrontContainerRangeComponent implements OnInit {

  @Input() maxRange;
  @Input() minRange;
  @Input() position;

  constructor() { }

  ngOnInit() {
  }

}
