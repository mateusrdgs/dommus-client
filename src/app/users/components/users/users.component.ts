import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from './../../../shared/emitters/top-bar.emitter';

import { User } from '../../classes/user';

@Component({
  selector: 'user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl']
})
export class UsersComponent implements OnInit {

  users: Array<User>;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topBarEmitter.emitNewRouteTitle('Users');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['users'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const users = response.json()['Users'];
            this.users = this.iterateOverUsers(users);
          } else {
            console.error(response);
          }
        }, error => {
          console.error(error);
        });
  }

  iterateOverUsers(users: any): Array<User> {
    return users.map(user => {
      const { name, isAdmin, _id } = user;
      return new User(name, isAdmin, _id);
    });
  }

}
