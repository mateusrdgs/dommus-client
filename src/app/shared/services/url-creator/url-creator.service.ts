import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { WindowService } from './../window/window.service';

@Injectable()
export class UrlCreatorService {

  constructor(
    private _windowService: WindowService,
    private _router: Router
  ) { }

  getCurrentUrl() {
    const { protocol, port, hostname } = this._windowService.window().location,
          _url = `${protocol}//${hostname}:${port}`;
  }

  createResidenceUrl() {
    console.log(this._router);
  }

  private createUrl(
    type: string, level: string, url: string,
    idAccount: string, idResidence: string,
    idRoom?: string, idComponent?: string) {
    switch (type) {
      case 'new':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/${idRoom}/components/new`;
      case 'get':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/${idRoom}/components`;
      case 'id':
        return `${url}/${idAccount}/residences/${idResidence}/rooms/${idRoom}/components/${idComponent}`;
    }
  }

}
