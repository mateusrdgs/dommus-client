import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['../card.component.styl'],
})
export class CardFrontComponent implements OnInit {

  @Input() component;

  constructor() { }

  ngOnInit() {
    console.log(this.component);
  }

}
