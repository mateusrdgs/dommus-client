import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileResolver } from './resolvers/profile.resolver.service';

import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    ProfileResolver
  ]
})
export class ProfileModule { }
