import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from './../shared/shared.module';

import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver.service';
import { UserResolver } from './resolvers/user.resolver.service';

import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [
    UsersComponent,
    NewUserComponent,
    UserComponent
  ],
  providers: [
    UsersResolver,
    UserResolver,
    UsersService
  ]
})
export class UsersModule { }
