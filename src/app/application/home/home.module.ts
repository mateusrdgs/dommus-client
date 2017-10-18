import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { HomeComponent } from './home.component';
import { SwitchComponent } from './switch/switch.component';
import { ThermometerComponent } from './thermometer/thermometer.component';
import { LightComponent } from './light/light.component';
import { MotionComponent } from './motion/motion.component';
import { SensorComponent } from './sensor/sensor.component';
import { ServoComponent } from './servo/servo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    SwitchComponent,
    ThermometerComponent,
    LightComponent,
    MotionComponent,
    SensorComponent,
    ServoComponent
  ],
  providers: [],
})
export class HomeModule { }
