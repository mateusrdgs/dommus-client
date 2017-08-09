import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    HttpModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    NewAccountComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
