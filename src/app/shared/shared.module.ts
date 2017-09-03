import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResidencesModule } from './../residences/residences.module';

import { AppGuard } from './guards/app.guards.service';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { SocketIoService } from './services/socket-io.service';
import { SyncService } from './services/sync.service';
import { SideBarService } from './services/side-bar.service';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopbarComponent } from './components/top-bar/top-bar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MenuToggleComponent } from './components/top-bar/menu-toggle/menu-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ResidencesModule
  ],
  exports: [
    SideMenuComponent,
    TopbarComponent,
    WrapperComponent
  ],
  declarations: [
    SideMenuComponent,
    TopbarComponent,
    WrapperComponent,
    MenuToggleComponent
  ],
  providers: [
    AppGuard,
    AuthService,
    LocalStorageService,
    SocketIoService,
    SyncService,
    SideBarService
  ]
})
export class SharedModule { }
