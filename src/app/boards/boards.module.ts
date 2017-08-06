import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './resolvers/boards.resolver.service';
import { BoardResolver } from './resolvers/board.resolver.service';
import { BoardsComponent } from './boards.component';
import { BoardComponent } from './board/board.component';
import { NewBoardComponent } from './new-board/new-board.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    BoardsRoutingModule
  ],
  declarations: [BoardsComponent, BoardComponent, NewBoardComponent],
  providers: [
    BoardsService,
    BoardsResolver,
    BoardResolver
  ]
})
export class BoardsModule { }
