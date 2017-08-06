import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardsComponent } from './boards.component';
import { NewBoardComponent } from './new-board/new-board.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent
  },
  {
    path: 'new',
    component: NewBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
