import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { ResidencesModule } from './residences/residences.module';
import { HomeModule } from './home/home.module';

import { AppGuard } from './shared/guards/app.guards.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    SharedModule.forRoot(),
    ResidencesModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
