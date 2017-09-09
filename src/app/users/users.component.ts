import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { TopBarEmitter } from './../shared/emitters/top-bar.emitter';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl']
})
export class UsersComponent implements OnInit {

  users = [];
  routeSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.users = this._route.snapshot.data['users'];
    this._topBarEmitter.emitNewRouteTitle('Users');
  }

}
