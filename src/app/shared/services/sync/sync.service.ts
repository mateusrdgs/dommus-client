import { Injectable } from '@angular/core';

import { ResidencesService } from './../../../application/residences/services/residences.service';

@Injectable()
export class SyncService {

  constructor(
    private _residencesService: ResidencesService
  ) { }

  syncApps(idResidence: string) {
    return this._residencesService.getResidenceById(idResidence).then(residence => residence);
  }

}
