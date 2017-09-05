import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SwitchComponent } from './switch/switch.component';
import { ThermometerComponent } from './thermometer/thermometer.component';
import { LightComponent } from './light/light.component';
import { MotionComponent } from './motion/motion.component';
import { SensorComponent } from './sensor/sensor.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    SwitchComponent,
    ThermometerComponent,
    LightComponent,
    MotionComponent,
    SensorComponent
  ],
  providers: [],
})
export class HomeModule { }
