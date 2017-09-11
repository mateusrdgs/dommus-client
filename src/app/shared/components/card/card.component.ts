import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.styl']
})
export class CardComponent implements OnInit {

  @Input() component;
  flippedTo: string;

  constructor() { }

  ngOnInit() {
  }

}
