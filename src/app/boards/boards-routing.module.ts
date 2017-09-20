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
    },
    data: {
      title: 'Boards'
    }
  },
  {
    path: 'new',
    component: NewBoardComponent,
    data: {
      title: 'New board'
    }
  },
  {
    path: ':idBoard',
    component: BoardComponent,
    resolve: {
      board: BoardResolver
    },
    data: {
      title: 'Board'
    }
  },
  {
    path: ':idBoard/update',
    component: UpdateBoardComponent,
    resolve: {
      board: BoardResolver
    },
    data: {
      title: 'Update board'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
