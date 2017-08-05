import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this._route.snapshot.data['user']['User'];
  }

}
