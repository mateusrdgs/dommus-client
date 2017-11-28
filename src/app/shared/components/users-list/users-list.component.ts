import { viewAnimation } from './../../animations/view.animation';
import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class UsersListComponent implements OnInit {

  @Input() set: any[];

  constructor() { }

  ngOnInit() {
  }

}
