import { ButtonBackComponent } from './../shared/button-back/button-back.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ResidencesRoutingModule } from './residences-routing.module';
import { SharedModule } from './../shared/shared.module';

import { ResidencesService } from './residences.service';
import { ResidencesResolver } from './resolvers/residences.resolver.service';
import { ResidenceResolver } from './resolvers/residence.resolver.service';

import { ResidencesComponent } from './residences.component';
import { NewResidenceComponent } from './new-residence/new-residence.component';
import { ResidenceComponent } from './residence/residence.component';
import { UpdateResidenceComponent } from './update-residence/update-residence.component';

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
