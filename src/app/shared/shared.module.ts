import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppGuard } from './guards/app.guards.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    TopbarComponent
  ],
  declarations: [
    MenuComponent,
    TopbarComponent
  ],
  providers: [
    AppGuard,
    AuthService,
    LocalStorageService
  ]
})
export class SharedModule { }
