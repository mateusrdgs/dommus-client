import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.styl']
})
export class ListComponent implements OnInit {

  @Input() set: Array<any>;

  constructor() { }

  ngOnInit() {

  }

}
