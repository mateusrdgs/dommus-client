import { Component, OnInit } from '@angular/core';

import { routeAnimation } from '../../animations/route.animation';

@Component({
  selector: 'account-router-outlet',
  templateUrl: './account-router-outlet.component.html',
  styleUrls: ['./account-router-outlet.component.styl'],
  animations: [routeAnimation],
  host: { '[@routeAnimation]': '' }
})
export class AccountRouterOutletComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
