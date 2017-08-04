import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ResidencesRoutingModule } from './residences-routing.module';
import { ResidencesService } from './residences.service';
import { ResidencesComponent } from './residences.component';

@NgModule({
  imports: [
    CommonModule,
    ResidencesRoutingModule
  ],
  declarations: [
    ResidencesComponent
  ],
  providers: [
    ResidencesService
  ]
})
export class ResidencesModule { }
