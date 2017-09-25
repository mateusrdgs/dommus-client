import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from './../../classes/user';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['user'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const { _id, name, isAdmin } = response.json()['User'];
            this.user = new User(name, isAdmin === 'true' ? true : false, _id);
          } else {
            console.error(response);
          }
        }, error => {
          console.error(error);
        });
  }

}
