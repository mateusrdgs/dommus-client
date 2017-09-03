import { Component, OnInit } from '@angular/core';

import { SideBarService } from './../../../services/side-bar.service';

@Component({
  selector: 'menu-toggle',
  templateUrl: './menu-toggle.component.html',
  styleUrls: ['./menu-toggle.component.styl']
})
export class MenuToggleComponent implements OnInit {

  private isMenuOpen = false;

  constructor(
    private _sidebarService: SideBarService
  ) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this._sidebarService.showSidebar(this.isMenuOpen);
  }

}
