import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SwitchComponent } from './switch/switch.component';
import { ThermometerComponent } from './thermometer/thermometer.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    SwitchComponent,
    ThermometerComponent
  ],
  providers: [],
})
export class HomeModule { }
