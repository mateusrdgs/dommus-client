import { UpdateBoardComponent } from './update-board/update-board.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardsResolver } from './resolvers/boards.resolver.service';
import { BoardResolver } from './resolvers/board.resolver.service';
import { BoardsComponent } from './boards.component';
import { BoardComponent } from './board/board.component';
import { NewBoardComponent } from './new-board/new-board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    resolve: {
      boards: BoardsResolver
    }
  },
  {
    path: 'new',
    component: NewBoardComponent
  },
  {
    path: ':idBoard',
    component: BoardComponent,
    resolve: {
      board: BoardResolver
    }
  },
  {
    path: ':idBoard/update',
    component: UpdateBoardComponent,
    resolve: {
      board: BoardResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
