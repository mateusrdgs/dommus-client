import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { RouterOutletComponent } from './../shared/components/router-outlet/router-outlet.component';

import { AppGuard } from './../shared/guards/app.guards.service';

const routes: Routes = [
  {
    path: '',
    component: RouterOutletComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'residences',
        loadChildren: 'app/residences/residences.module#ResidencesModule',
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
export class HomeRoutingModule { }