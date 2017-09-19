import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ComponentsRoutingModule } from './components-routing.module';
import { SharedModule } from './../shared/shared.module';

import { BoardsResolver } from './../boards/resolvers/boards.resolver.service';
import { BoardsService } from './../boards/boards.service';
import { ComponentsService } from './components.service';
import { ComponentResolver } from './resolvers/component.resolver.service';
import { NewComponentGuard } from './guards/new-component.guard.service';

import { ComponentsComponent } from './components.component';
import { ComponentComponent } from './component/component.component';
import { NewComponentComponent } from './new-component/new-component.component';
import { UpdateComponentComponent } from './update-component/update-component.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    SharedModule
  ],
  declarations: [
    ComponentsComponent,
    NewComponentComponent,
    ComponentComponent,
    UpdateComponentComponent
  ],
  providers: [
    BoardsService,
    BoardsResolver,
    ComponentsService,
    ComponentResolver,
    NewComponentGuard
  ]
})
export class ComponentsModule { }
