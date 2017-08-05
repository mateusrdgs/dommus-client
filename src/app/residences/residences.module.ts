import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ResidencesRoutingModule } from './residences-routing.module';
import { ResidencesService } from './residences.service';
import { ResidencesComponent } from './residences.component';
import { NewResidenceComponent } from './new-residence/new-residence.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ResidencesRoutingModule
  ],
  declarations: [
    ResidencesComponent,
    NewResidenceComponent
  ],
  providers: [
    ResidencesService
  ]
})
export class ResidencesModule { }
