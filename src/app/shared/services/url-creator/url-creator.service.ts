import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from './../local-storage/local-storage.service';
import { WindowService } from './../window/window.service';

@Injectable()
export class UrlCreatorService {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _windowService: WindowService
  ) { }

  private getCurrentUrl() {
    const { protocol, port, hostname } = this._windowService.window().location;
          return `${protocol}//${ '192.168.0.5' }:${'3000' || port}/api/`;
  }

  private getDataFromLocalStorage(tokenName: string, tokenValue: string) {
    return this._localStorageService.getTokenPropertyValue(tokenName, tokenValue, true);
  }

  private getParameterFromRoute(parameter: string) {
    return this._activatedRoute.snapshot.params[parameter];
  }

  private appendSuffixesToUrl(url: string, suffixes: Array<string>): string {
    return url.concat(suffixes.reduce((prevSuffix, currSuffix) => `${prevSuffix}${currSuffix || ''}`));
  }

  private mountAccountUrl(method: string) {
    const url = `${ this.getCurrentUrl() }`;
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['account/', 'new']) }`;
      }
      case 'login': {
        return `${ this.appendSuffixesToUrl(url, ['account/', 'login']) }`;
      }
      case 'id': {
        const idAccount = this.getDataFromLocalStorage('Dommus', '_id');
        return `${ this.appendSuffixesToUrl(url, ['account/', `${ idAccount }/`]) }`;
      }
    }
  }

  private mountUsersUrl(method: string, routeParams?: any) {
    const url = this.mountAccountUrl('id');
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['users/', 'new']) }`;
      }
      case 'get': {
        return `${ this.appendSuffixesToUrl(url, ['users/']) }`;
      }
      case 'id': {
        const { idUser } = routeParams;
        return `${ this.appendSuffixesToUrl(url, ['users/', `${ idUser }/`]) }`;
      }
    }
  }

  private mountResidencesUrl(method: string, routeParams?: any) {
    const url = this.mountAccountUrl('id');
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['residences/', 'new']) }`;
      }
      case 'get': {
        return `${ this.appendSuffixesToUrl(url, ['residences/']) }`;
      }
      case 'id': {
        const { idResidence } = routeParams;
        return `${ this.appendSuffixesToUrl(url, ['residences/', `${ idResidence }/`]) }`;
      }
    }
  }

  private mountRoomsUrl(method: string, routeParams?: any) {
    const url = this.mountResidencesUrl('id', routeParams);
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['rooms/', 'new']) }`;
      }
      case 'get': {
        return `${ this.appendSuffixesToUrl(url, ['rooms/']) }`;
      }
      case 'id': {
        const { idRoom } = routeParams;
        return `${ this.appendSuffixesToUrl(url, ['rooms/', `${ idRoom }/`]) }`;
      }
    }
  }

  private mountBoardsUrl(method: string, routeParams?: any) {
    const url = this.mountResidencesUrl('id', routeParams);
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['boards/', 'new']) }`;
      }
      case 'get': {
        return `${ this.appendSuffixesToUrl(url, ['boards/']) }`;
      }
      case 'id': {
        const { idBoard } = routeParams;
        return `${ this.appendSuffixesToUrl(url, ['boards/', `${ idBoard }/`]) }`;
      }
    }
  }

  private mountComponentsUrl(method: string, routeParams?: any) {
    const url = this.mountRoomsUrl('id', routeParams);
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['components/', 'new']) }`;
      }
      case 'get': {
        return `${ this.appendSuffixesToUrl(url, ['components/']) }`;
      }
      case 'id': {
        const { idComponent } = routeParams;
        return `${ this.appendSuffixesToUrl(url, ['components/', `${ idComponent }/`]) }`;
      }
    }
  }

  public createUrl(path: string, method: string, routeParams?: any): string {
    switch (path) {
      case 'account': {
        return this.mountAccountUrl(method);
      }
      case 'users': {
        return this.mountUsersUrl(method, routeParams);
      }
      case 'residences': {
        return this.mountResidencesUrl(method, routeParams);
      }
      case 'rooms': {
        return this.mountRoomsUrl(method, routeParams);
      }
      case 'boards': {
        return this.mountBoardsUrl(method, routeParams);
      }
      case 'components': {
        return this.mountComponentsUrl(method, routeParams);
      }
    }
  }

}
