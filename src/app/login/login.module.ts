import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

import { NewAccountComponent } from './new-account/new-account.component';
import { UsersComponent } from './users/components/users/users.component';
import { UsersResolver } from './users/resolvers/users.resolver';
import { NewUserComponent } from './users/components/new-user/new-user.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    NewAccountComponent,
    UsersComponent,
    NewUserComponent
  ],
  providers: [
    LoginService,
    UsersResolver
  ]
})
export class LoginModule { }
