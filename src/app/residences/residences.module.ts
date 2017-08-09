import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ResidencesRoutingModule } from './residences-routing.module';
import { ResidencesService } from './residences.service';
import { ResidencesResolver } from './resolvers/residences.resolver.service';
import { ResidenceResolver } from './resolvers/residence.resolver.service';
import { ResidencesComponent } from './residences.component';
import { NewResidenceComponent } from './new-residence/new-residence.component';
import { ResidenceComponent } from './residence/residence.component';
import { AppGuard } from './../shared/guards/app.guards.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ResidencesRoutingModule
  ],
  declarations: [
    ResidencesComponent,
    NewResidenceComponent,
    ResidenceComponent
  ],
  providers: [
    ResidencesService,
    ResidencesResolver,
    ResidenceResolver,
    AppGuard
  ]
})
export class ResidencesModule { }
