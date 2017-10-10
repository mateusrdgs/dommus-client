import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front-container-icon',
  templateUrl: './card-front-container-icon.component.html',
  styleUrls: ['./card-front-container-icon.component.styl']
})
export class CardFrontContainerIconComponent implements OnInit {

  @Input() type: number;

  constructor() { }

  ngOnInit() {
  }

}
