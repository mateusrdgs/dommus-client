import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { ComponentComponent } from './component.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentRoutingModule
  ],
  declarations: [ComponentComponent]
})
export class ComponentModule { }
