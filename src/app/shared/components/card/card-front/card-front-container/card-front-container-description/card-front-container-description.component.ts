import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-front-container-description',
  templateUrl: './card-front-container-description.component.html',
  styleUrls: ['./card-front-container-description.component.styl']
})
export class CardFrontContainerDescriptionComponent implements OnInit {

  @Input() description;

  constructor() { }

  ngOnInit() {
  }

}
