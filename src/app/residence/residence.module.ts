import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidenceRoutingModule } from './residence-routing.module';
import { ResidenceComponent } from './residence.component';

@NgModule({
  imports: [
    CommonModule,
    ResidenceRoutingModule
  ],
  declarations: [ResidenceComponent]
})
export class ResidenceModule { }
