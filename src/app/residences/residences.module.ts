import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidencesRoutingModule } from './residences-routing.module';
import { ResidencesComponent } from './residences.component';

@NgModule({
  imports: [
    CommonModule,
    ResidencesRoutingModule
  ],
  declarations: [ResidencesComponent]
})
export class ResidencesModule { }
