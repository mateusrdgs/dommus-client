import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'button-new',
  templateUrl: './button-new.component.html',
  styleUrls: ['./button-new.component.styl']
})
export class ButtonNewComponent implements OnInit {

  @Input() routePath;
  private routeName;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    const url = this._router.url,
          splittedUrl = url.split('/'),
          splittedUrlLength = splittedUrl.length,
          lastElementFromSplittedUrl = splittedUrl[splittedUrlLength - 1];
    if (splittedUrlLength > 2) {
      this.routeName = lastElementFromSplittedUrl.slice(0, lastElementFromSplittedUrl.length - 1);
    } else {
      this.routeName = url.slice(1, url.length - 1);
    }
  }

  goNew() {
    const url = `${this._router.url}/new`;
    this._router.navigateByUrl(url);
  }

}
