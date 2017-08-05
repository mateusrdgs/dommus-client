import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { NewAccountService } from './new-account/new-account.service';

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
    NewAccountService
  ]
})
export class LoginModule { }
