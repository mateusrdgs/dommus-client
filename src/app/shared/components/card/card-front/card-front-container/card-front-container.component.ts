import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front-container',
  templateUrl: './card-front-container.component.html',
  styleUrls: ['./card-front-container.component.styl']
})
export class CardFrontContainerComponent implements OnInit {

  @Input() data;
  @Input() description;
  @Input() type;

  constructor() { }

  ngOnInit() {
  }

}
