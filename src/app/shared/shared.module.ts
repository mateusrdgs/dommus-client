import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResidencesModule } from './../residences/residences.module';

import { AppGuard } from './guards/app.guards.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { SocketIoService } from './services/socket-io.service';
import { SyncService } from './services/sync.service';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopbarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ResidencesModule
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
    LocalStorageService,
    SocketIoService,
    SyncService
  ]
})
export class SharedModule { }
