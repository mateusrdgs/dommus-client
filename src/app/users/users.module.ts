import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';
import { UsersResolver } from './resolvers/users.resolver.service';
import { UsersComponent } from './users.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    NewUserComponent
  ],
  providers: [
    UsersResolver,
    UsersService
  ]
})
export class UsersModule { }
