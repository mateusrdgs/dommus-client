import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { UrlCreatorService } from './../url-creator/url-creator.service';
import { RemoteService } from './../remote/remote.service';

@Injectable()
export class SyncService {

  constructor(
    private _urlCreatorService: UrlCreatorService,
    private _remoteService: RemoteService
  ) { }

  syncApps(idResidence: string) {
    const url = this._urlCreatorService.createUrl('residences', 'id', { idResidence });
    return this._remoteService
               .getResources(url)
               .map(response => response)
               .catch(error => Observable.of(error));
  }

}
