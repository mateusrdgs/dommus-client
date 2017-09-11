import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['../card.component.styl'],
})
export class CardFrontComponent implements OnInit {

  @Input() componentType = 0;
  @Input() componentDescription = '';

  constructor() { }

  ngOnInit() {
  }

}
