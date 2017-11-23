import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'button-update',
  templateUrl: './button-update.component.html',
  styleUrls: ['./button-update.component.styl']
})
export class ButtonUpdateComponent implements OnInit {

  @Input() routePath;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  private routeName;
  public showButton: boolean;

  ngOnInit() {
    this.generateRoutePath();
    this.showButton = this._authService.checkUserPermission('Dommus_User');
  }

  generateRoutePath() {
    const url = this._router.url,
    splittedUrl = url.split('/'),
    splittedUrlLength = splittedUrl.length,
    lastElementFromSplittedUrl = splittedUrl[splittedUrlLength - 2];
    if (splittedUrlLength > 2) {
      this.routeName = lastElementFromSplittedUrl.slice(0, lastElementFromSplittedUrl.length - 1);
    } else {
      this.routeName = url.slice(1, url.length - 1);
    }
  }

  goUpdate() {
    const url = `${this._router.url}/update`;
    this._router.navigateByUrl(url);
  }

}
