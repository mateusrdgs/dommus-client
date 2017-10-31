import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'table-tasks',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent implements AfterContentInit {

  @Input() headers;
  @Input() rows;

  constructor() { }

  ngAfterContentInit() {
    setTimeout(() => {
      console.log(Object.keys(this.rows[0]));
    }, 2000);
  }

}
