import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsService } from './components.service';
import { ComponentsComponent } from './components.component';
import { NewComponentComponent } from './new-component/new-component.component';
import { ComponentComponent } from './component/component.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentsRoutingModule
  ],
  declarations: [ComponentsComponent, NewComponentComponent, ComponentComponent],
  providers: [ComponentsService]
})
export class ComponentsModule { }
