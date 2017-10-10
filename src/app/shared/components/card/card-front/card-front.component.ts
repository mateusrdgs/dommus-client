import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['../card.component.styl', '../card.component.styl']
})
export class CardFrontComponent implements OnInit {

  @Input() component;
  @Input() detectedMotion;
  data: any;

  constructor() { }

  ngOnInit() {
    switch (this.component.type) {
      case 2: {
        this.data = {
          celsius: this.component.celsius,
          fahrenheit: this.component.fahrenheit
        };
        break;
      }
      case 3: {
        this.data = {
          value: this.component.value
        };
        break;
      }
    }
  }

}
