import { Observable } from 'rxjs/Observable';

export interface IRemote {

  generateRemoteServiceOptions(): void;
  getResources(url: string): Observable<any>;

}
