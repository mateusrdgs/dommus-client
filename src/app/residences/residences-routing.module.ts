import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGuard } from './../shared/guards/app.guards.service';
import { ResidencesResolver } from './resolvers/residences.resolver.service';
import { ResidenceResolver } from './resolvers/residence.resolver.service';

import { ResidencesComponent } from './residences.component';
import { NewResidenceComponent } from './new-residence/new-residence.component';
import { ResidenceComponent } from './residence/residence.component';
import { UpdateResidenceComponent } from './update-residence/update-residence.component';

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
    path: ':idResidence',
    component: ResidenceComponent,
    resolve: {
      residence: ResidenceResolver
    }
  },
  {
    path: ':idResidence/update',
    component: UpdateResidenceComponent
  },
  {
    path: ':idResidence/rooms',
    loadChildren: 'app/rooms/rooms.module#RoomsModule'
  },
  {
    path: ':idResidence/boards',
    loadChildren: 'app/boards/boards.module#BoardsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidencesRoutingModule { }
