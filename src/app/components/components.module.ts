import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ComponentsRoutingModule } from './components-routing.module';
import { SharedModule } from './../shared/shared.module';
import { BoardsModule } from './../boards/boards.module';

import { ComponentsService } from './services/components.service';
import { ComponentResolver } from './resolvers/component.resolver.service';
import { NewComponentGuard } from './guards/new-component.guard.service';

import { ComponentsComponent } from './components/components/components.component';
import { ComponentComponent } from './components/component/component.component';
import { NewComponentComponent } from './components/new-component/new-component.component';
import { UpdateComponentComponent } from './components/update-component/update-component.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    SharedModule,
    BoardsModule
  ],
  declarations: [
    ComponentsComponent,
    NewComponentComponent,
    ComponentComponent,
    UpdateComponentComponent
  ],
  providers: [
    ComponentsService,
    ComponentResolver,
    NewComponentGuard
  ]
})
export class ComponentsModule { }
