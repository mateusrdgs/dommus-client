import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front-container-data',
  templateUrl: './card-front-container-data.component.html',
  styleUrls: ['./card-front-container-data.component.styl']
})
export class CardFrontContainerDataComponent implements OnInit {

  @Input() data;
  @Input() type;
  showCelsius = true;

  constructor() { }

  ngOnInit() {
  }

  toggleData() {
    this.showCelsius = !this.showCelsius;
  }

}
