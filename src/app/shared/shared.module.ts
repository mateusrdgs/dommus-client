import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalStorageService } from './services/local-storage.service';
import { AppGuard } from './guards/app.guards.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [
  ],
  providers: [
    AppGuard,
    LocalStorageService
  ]
})
export class SharedModule { }
