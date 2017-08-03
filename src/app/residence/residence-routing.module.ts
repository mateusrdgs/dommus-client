import { ResidenceComponent } from './residence.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ResidenceComponent,
  children: []
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidenceRoutingModule { }
