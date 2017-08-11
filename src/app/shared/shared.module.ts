import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppGuard } from './guards/app.guards.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [
  ],
  providers: [
    AppGuard,
    AuthService,
    LocalStorageService
  ]
})
export class SharedModule { }
