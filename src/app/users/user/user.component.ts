import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const { _id, name, isAdmin } = this._route.snapshot.data['user'];
    this.user = new User(name, isAdmin === 'true' ? true : false, _id);
  }

}
