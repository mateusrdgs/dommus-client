import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front-description',
  templateUrl: './card-front-description.component.html',
  styleUrls: ['../../card.component.styl'],
})
export class CardFrontDescriptionComponent implements OnInit {

  @Input() componentType = 0;
  @Input() componentDescription = '';
  constructor() { }

  ngOnInit() {
  }

}
