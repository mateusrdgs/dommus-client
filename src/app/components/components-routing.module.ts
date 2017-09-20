import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewComponentGuard } from './guards/new-component.guard.service';
import { BoardsResolver } from './../boards/resolvers/boards.resolver.service';
import { ComponentResolver } from './resolvers/component.resolver.service';

import { ComponentsComponent } from './components.component';
import { ComponentComponent } from './component/component.component';
import { NewComponentComponent } from './new-component/new-component.component';
import { UpdateComponentComponent } from './update-component/update-component.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    data: {
      title: 'Components'
    }
  },
  {
    path: 'new',
    component: NewComponentComponent,
    resolve: {
      boards: BoardsResolver
    },
    canActivate: [NewComponentGuard],
    data: {
      title: 'New component'
    }
  },
  {
    path: ':idComponent',
    component: ComponentComponent,
    resolve: {
      component: ComponentResolver
    },
    data: {
      title: 'Component'
    }
  },
  {
    path: ':idComponent/update',
    component: UpdateComponentComponent,
    resolve: {
      component: ComponentResolver,
      boards: BoardsResolver
    },
    data: {
      title: 'Update component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
