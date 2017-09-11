import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-back',
  templateUrl: './card-back.component.html',
  styleUrls: ['./card-back.component.styl']
})
export class CardBackComponent implements OnInit {

  @Input() flippedTo: string;

  constructor() { }

  ngOnInit() {
  }

}
