import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppGuard } from './../../shared/guards/app.guards.service';
import { ResidencesResolver } from './resolvers/residences.resolver.service';
import { ResidenceResolver } from './resolvers/residence.resolver.service';

import { ResidencesComponent } from './components/residences/residences.component';
import { NewResidenceComponent } from './components/new-residence/new-residence.component';
import { ResidenceComponent } from './components/residence/residence.component';
import { UpdateResidenceComponent } from './components/update-residence/update-residence.component';

const routes: Routes = [
  {
    path: '',
    component: ResidencesComponent,
    resolve: {
      residences: ResidencesResolver
    },
    data: {
      title: 'Residences'
    }
  },
  {
    path: 'new',
    component: NewResidenceComponent,
    data: {
      title: 'New residence'
    }
  },
  {
    path: ':idResidence',
    component: ResidenceComponent,
    resolve: {
      residence: ResidenceResolver
    },
    data: {
      title: 'Residence'
    }
  },
  {
    path: ':idResidence/update',
    component: UpdateResidenceComponent,
    resolve: {
      residence: ResidenceResolver
    },
    data: {
      title: 'Update residence'
    }
  },
  {
    path: ':idResidence/rooms',
    loadChildren: 'app/application/rooms/rooms.module#RoomsModule'
  },
  {
    path: ':idResidence/boards',
    loadChildren: 'app/application/boards/boards.module#BoardsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidencesRoutingModule { }
