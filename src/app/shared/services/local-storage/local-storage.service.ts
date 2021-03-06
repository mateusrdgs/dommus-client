import { Injectable } from '@angular/core';

import { LocalStorageInterface } from './../../interfaces/local-storage.interface';

@Injectable()
export class LocalStorageService implements LocalStorageInterface {

  constructor() { }

  saveToken(tokenName: string, tokenValue: string): void {
    window.localStorage[tokenName] = tokenValue;
  }

  encodeAndSaveToken(tokenName: string, tokenValue: string): void {
    const encodedValue = window.btoa(tokenValue),
          token = { token: encodedValue },
          stringfyiedToken = JSON.stringify(token);
    window.localStorage[tokenName] = stringfyiedToken;
  }

  getToken(tokenName: string): string {
    return window.localStorage.getItem(tokenName) || '';
  }

  getDecodedToken(tokenName: string): string {
    const stringfyiedToken = this.getToken(tokenName);
    if (stringfyiedToken.length) {
      const parsedToken = JSON.parse(stringfyiedToken),
            { token } = parsedToken;
      return JSON.parse(window.atob(token));
    } else {
      return '';
    }
  }

  getTokenValue(tokenName: string): string {
    const token = this.getToken(tokenName);
    if (token.length) {
      try {
        const parsedToken = JSON.parse(token);
        return parsedToken['token'];
      } catch (error) {
        console.error(error);
        return '';
      }
    } else {
      return token;
    }
  }

  getTokenPropertyValue(tokenName: string, property: string, isJwt: boolean): string {
    const token = this.getToken(tokenName);
    if (token.length) {
      try {
        let payload;
        if (isJwt) {
          payload = JSON.parse(window.atob(token.split('.')[1]));
        } else {
          payload = this.getDecodedToken(tokenName);
        }
        return payload[property];
      } catch (error) {
        console.error(error);
        return '';
      }
    } else {
      return token;
    }
  }

  removeToken(tokenName: string): void {
    window.localStorage.removeItem(tokenName);
  }
}
