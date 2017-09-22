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
          return `${protocol}//${hostname}:${'3000' || port}/api/`;
  }

  private getDataFromLocalStorage(tokenName: string, tokenValue: string) {
    return this._localStorageService.getTokenPropertyValue(tokenName, tokenValue, true);
  }

  private getParameterFromRoute(parameter: string) {
    return this._activatedRoute.snapshot.params[parameter];
  }

  private appendSuffixesToUrl(url: string, suffixes: Array<string>): string {
    return url.concat(suffixes.reduce((prevSuffix, currSuffix) => {
                        return `${prevSuffix}${currSuffix || ''}`;
                     }));
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

  private mountResidencesUrl(method: string, idResidence?: string) {
    const url = this.mountAccountUrl('id');
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['residences/', 'new']) }`;
      }
      case 'get': {
        return `${ this.appendSuffixesToUrl(url, ['residences/']) }`;
      }
      case 'id': {
        return `${ this.appendSuffixesToUrl(url, ['residences/', `${ idResidence }/`]) }`;
      }
    }
  }

  private mountRoomsUrl(method: string, idResidence?: string, idRoom?: string) {
    const url = this.mountResidencesUrl('id', idResidence);
    switch (method) {
      case 'new': {
        return `${ this.appendSuffixesToUrl(url, ['rooms/', 'new']) }`;
      }
      case 'get': {
        return `${ this.appendSuffixesToUrl(url, ['rooms/']) }`;
      }
      case 'id': {
        return `${ this.appendSuffixesToUrl(url, ['rooms/', `${ idRoom }/`]) }`;
      }
    }
  }

  public createUrl(path: string, method: string, routeParams?: any): string {
    const { idResidence, idRoom, idComponent } = routeParams;
    switch (path) {
      case 'account':
        return this.mountAccountUrl(method);
      case 'residences':
        return this.mountResidencesUrl(method, idResidence);
      case 'rooms':
        return this.mountRoomsUrl(method, idResidence, idRoom);
    }
  }

}
