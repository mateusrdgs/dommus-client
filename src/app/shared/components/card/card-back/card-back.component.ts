import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-back',
  templateUrl: './card-back.component.html',
  styleUrls: [
    '../card.component.styl',
    './card-back.component.styl'
  ]
})
export class CardBackComponent implements OnInit {

  @Input() componentType: string;
  @Input() flippedTo: string;
  @Input() componentIsOn = '';

  constructor() { }

  ngOnInit() {

  }

}
