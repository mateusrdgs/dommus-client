import { viewAnimation } from './../../animations/view.animation';
import { Component, Input, EventEmitter, OnInit, Output, AfterContentInit } from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class UsersListComponent implements OnInit {

  @Input() set: any[];
  @Output() adminChosen: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onUserChosen(idUser) {
    const [ isAdmin ] = this.set.filter(user => user).filter(user => idUser === user.Id).map(user => user.IsAdmin);
    this.adminChosen.emit({ isAdmin, idUser});
  }

}
