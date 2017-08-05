import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidenceResolver } from './resolvers/residence.resolver.service';
import { ResidencesResolver } from './resolvers/residences.resolver.service';
import { ResidencesComponent } from './residences.component';
import { NewResidenceComponent } from './new-residence/new-residence.component';

const routes: Routes = [
  {
    path: '',
    component: ResidencesComponent,
    resolve: {
      residences: ResidenceResolver
    }
  },
  {
    path: 'new',
    component: NewResidenceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidencesRoutingModule { }
