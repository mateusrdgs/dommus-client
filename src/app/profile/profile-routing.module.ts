import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountRouterOutletComponent } from './../shared/components/account-router-outlet/account-router-outlet.component';

import { ProfileComponent } from './components/profile/profile.component';

import { ProfileResolver } from './resolvers/profile.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AccountRouterOutletComponent,
    children: [
      {
        path: '',
        component: ProfileComponent,
        resolve: {
          profile: ProfileResolver
        },
        data: {
          title: 'Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
