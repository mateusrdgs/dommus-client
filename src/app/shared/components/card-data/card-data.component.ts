import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.styl']
})
export class CardDataComponent {

  @Input() title: string;
  @Input() properties: any[];

  constructor() { }

}
