import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ComponentsRoutingModule } from './components-routing.module';

import { BoardsResolver } from './../boards/resolvers/boards.resolver.service';
import { BoardsService } from './../boards/boards.service';
import { ComponentsService } from './components.service';
import { ComponentResolver } from './resolvers/component.resolver.service';

import { ComponentsComponent } from './components.component';
import { ComponentComponent } from './component/component.component';
import { NewComponentComponent } from './new-component/new-component.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentsRoutingModule
  ],
  declarations: [
    ComponentsComponent,
    NewComponentComponent,
    ComponentComponent
  ],
  providers: [
    BoardsService,
    BoardsResolver,
    ComponentsService,
    ComponentResolver
  ]
})
export class ComponentsModule { }
