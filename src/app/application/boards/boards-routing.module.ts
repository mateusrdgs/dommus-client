import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPermissionGuard } from './../../shared/guards/user-permission.guard';

import { BoardsResolver } from './resolvers/boards.resolver.service';
import { BoardResolver } from './resolvers/board.resolver.service';

import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/board/board.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { UpdateBoardComponent } from './components/update-board/update-board.component';

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
    },
    canLoad: [UserPermissionGuard],
    canActivate: [UserPermissionGuard]
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
    },
    canLoad: [UserPermissionGuard],
    canActivate: [UserPermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
