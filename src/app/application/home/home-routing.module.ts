import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ApplicationRouterOutletComponent } from './../../shared/components/application-router-outlet/application-router-outlet.component';

import { AppGuard } from './../../shared/guards/app.guards.service';

const routes: Routes = [
  {
    path: '',
    component: ApplicationRouterOutletComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'residences',
        loadChildren: 'app/application/residences/residences.module#ResidencesModule',
        canActivate: [AppGuard],
        canLoad: [AppGuard]
      },
      {
        path: 'profile',
        loadChildren: 'app/application/profile/profile.module#ProfileModule',
        canActivate: [AppGuard],
        canLoad: [AppGuard]
      },
      {
        path: 'users',
        loadChildren: 'app/application/users/users.module#UsersModule',
        canActivate: [AppGuard],
        canLoad: [AppGuard]
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {

}
