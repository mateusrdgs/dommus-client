import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-update',
  templateUrl: './button-update.component.html',
  styleUrls: ['./button-update.component.styl']
})
export class ButtonUpdateComponent implements OnInit {

  @Input() routePath;
  private routeName;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
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
