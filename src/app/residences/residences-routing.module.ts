import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidencesResolver } from './resolvers/residences.resolver.service';
import { ResidenceResolver } from './resolvers/residence.resolver.service';
import { ResidencesComponent } from './residences.component';
import { NewResidenceComponent } from './new-residence/new-residence.component';
import { ResidenceComponent } from './residence/residence.component';

const routes: Routes = [
  {
    path: '',
    component: ResidencesComponent,
    resolve: {
      residences: ResidencesResolver
    }
  },
  {
    path: 'new',
    component: NewResidenceComponent
  },
  {
    path: ':id',
    component: ResidenceComponent,
    resolve: {
      residence: ResidenceResolver
    },
    children: [
      {
        path: 'rooms',
        loadChildren: 'app/room/room.module#RoomModule'
      },
      {
        path: 'boards',
        loadChildren: 'app/board/board.module#BoardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidencesRoutingModule { }
