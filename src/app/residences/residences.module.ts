import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ResidencesRoutingModule } from './residences-routing.module';
import { SharedModule } from './../shared/shared.module';

import { ResidencesService } from './services/residences.service';
import { ResidencesResolver } from './resolvers/residences.resolver.service';
import { ResidenceResolver } from './resolvers/residence.resolver.service';

import { ResidencesComponent } from './components/residences/residences.component';
import { NewResidenceComponent } from './components/new-residence/new-residence.component';
import { ResidenceComponent } from './components/residence/residence.component';
import { UpdateResidenceComponent } from './components/update-residence/update-residence.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ResidencesRoutingModule,
    SharedModule
  ],
  declarations: [
    ResidencesComponent,
    NewResidenceComponent,
    ResidenceComponent,
    UpdateResidenceComponent
  ],
  providers: [
    ResidencesService,
    ResidencesResolver,
    ResidenceResolver
  ]
})
export class ResidencesModule { }
