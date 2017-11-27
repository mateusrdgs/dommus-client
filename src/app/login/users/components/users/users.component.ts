import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../application/users/classes/user';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class UsersComponent implements OnInit {

  users: User[];
  items = [];

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['users'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const users = response.json()['Users'];
            this.users = this.iterateOverUsers(users);
            console.log(this.users);
            this.createArrayOfItems(this.users);
          }
        })
        .unsubscribe();
  }

  createArrayOfItems(users: User[]): any {
    for (let index = 0; index < 4; index++) {
      this.items.push(users[index] || undefined);
    }
  }

  iterateOverUsers(users: any): User[] {
    if (Array.isArray(users)) {
      return users.map(user => {
        const { _id, name, isAdmin } = user;
        return new User(name, isAdmin === 'true', _id);
      });
    }
  }

}
