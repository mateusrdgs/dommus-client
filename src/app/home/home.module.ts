import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { FlipperComponent } from './flipper/flipper.component';
import { SwitchComponent } from './flipper/switch/switch.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    FlipperComponent,
    SwitchComponent
  ],
  providers: [],
})
export class HomeModule { }
