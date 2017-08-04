import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UserRoutingModule } from './user-routing.module';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    NewUserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
