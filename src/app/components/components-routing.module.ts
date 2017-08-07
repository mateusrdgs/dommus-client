import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components.component';
import { NewComponentComponent } from './new-component/new-component.component';
import { ComponentComponent } from './component/component.component';

const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent
  },
  {
    path: 'new',
    component: NewComponentComponent
  },
  {
    path: ':idComponent',
    component: ComponentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
