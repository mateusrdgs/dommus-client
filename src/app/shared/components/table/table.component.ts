import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-tasks',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent {

  @Input() headers;
  @Input() rows;

  constructor() { }

}
