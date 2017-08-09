import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  saveToken(tokenName: string, tokenValue: string) {
    window.localStorage[tokenName] = tokenValue;
  }

  getToken(tokenName: string) {
    return window.localStorage.getItem(tokenName) || '';
  }

  removeToken(tokenName: string) {
    window.localStorage.removeItem(tokenName);
  }

}
