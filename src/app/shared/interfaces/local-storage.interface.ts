export interface LocalStorageInterface {

  saveToken(tokenName: string, tokenValue: string): void;
  getToken(tokenName: string): string;
  getDecodedToken(tokenName: string): string;
  getTokenValue(tokenName: string): string;
  getTokenPropertyValue(tokenName: string, property: string, isJwt: boolean): string;
  removeToken(tokenName: string): void;

}
