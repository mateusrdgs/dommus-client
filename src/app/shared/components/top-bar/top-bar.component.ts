import { Component, OnInit } from '@angular/core';

import { SideBarService } from './../../services/side-bar.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.styl']
})
export class TopbarComponent implements OnInit {

  private isMenuOpen = false;

  constructor(
    private _sidebarService: SideBarService
  ) { }

  ngOnInit() {

  }

  onIconClick() {
    this.isMenuOpen = !this.isMenuOpen;
    this._sidebarService.showSidebar(this.isMenuOpen);
  }

}
