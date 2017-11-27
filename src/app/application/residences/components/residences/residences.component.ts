import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/catch';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';
import { AuthService } from './../../../../shared/services/auth/auth.service';

import Residence from './../../classes/residence';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'residences',
  templateUrl: './residences.component.html',
  styleUrls: ['./residences.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class ResidencesComponent implements OnInit {

  residences: Residence[];
  message = 'Loading...';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _topbarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this._topbarEmitter.emitNewRouteTitle('Residências');
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['residences'])
        .subscribe(response => {
          const userIsAdmin = this._authService.checkUserPermission('Dommus_User');
          if (response.hasOwnProperty('status') && response.status === 200) {
            const residences = response.json()['Residences'];
            if (userIsAdmin) {
              this.residences = this.iterateOverResidences(residences)
                                    .concat([{ isntItem: true, routePath: '', description: 'Cadastrar nova residência' }]);
            } else {
              this.residences = this.iterateOverResidences(residences);
            }
          } else {
            if (userIsAdmin) {
              this.residences =
              this.iterateOverResidences([])
                  .concat([{ isntItem: true, routePath: '', description: 'Cadastrar nova residência' }]);
            } else {
              this.residences = this.iterateOverResidences([]);
            }
          }
        }, error => {
          console.error(error);
        });
  }

  iterateOverResidences(residences: any): any {
    return residences.map(residence => {
      const { _id, url, description, boards, rooms } = residence;
      return new Residence(description, url, _id, rooms, boards);
    });
  }

}
