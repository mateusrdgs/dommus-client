import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { BoardsService } from './services/boards.service';
import { BoardsResolver } from './resolvers/boards.resolver.service';
import { BoardResolver } from './resolvers/board.resolver.service';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/board/board.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { UpdateBoardComponent } from './components/update-board/update-board.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    BoardsRoutingModule,
    SharedModule
  ],
  declarations: [
    BoardsComponent,
    BoardComponent,
    NewBoardComponent,
    UpdateBoardComponent
  ],
  providers: [
    BoardsService,
    BoardsResolver,
    BoardResolver
  ]
})
export class BoardsModule { }
