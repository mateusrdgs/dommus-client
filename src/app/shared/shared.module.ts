import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppGuard } from './guards/app.guards.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideMenuComponent,
    TopbarComponent
  ],
  declarations: [
    SideMenuComponent,
    TopbarComponent
  ],
  providers: [
    AppGuard,
    AuthService,
    LocalStorageService
  ]
})
export class SharedModule { }
