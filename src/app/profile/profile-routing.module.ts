import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileResolver } from './resolvers/profile.resolver.service';

import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  resolve: {
    profile: ProfileResolver
  },
  data: {
    title: 'Profile'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
