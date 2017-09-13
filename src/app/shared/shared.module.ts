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
import { TitleService } from './services/title.service';

import { TopBarEmitter } from './emitters/top-bar.emitter';
import { CardEmitter } from './emitters/card.emitter';

import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopbarComponent } from './components/top-bar/top-bar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { MenuToggleComponent } from './components/top-bar/menu-toggle/menu-toggle.component';
import { CardComponent } from './components/card/card.component';
import { CardFrontComponent } from './components/card/card-front/card-front.component';
import { CardFrontIconsComponent } from './components/card/card-front/card-front-icons/card-front-icons.component';
import { CardFrontDescriptionComponent } from './components/card/card-front/card-front-description/card-front-description.component';
import { CardBackComponent } from './components/card/card-back/card-back.component';
import { CardBackLeftComponent } from './components/card/card-back/card-back-left/card-back-left.component';
import { CardBackRightComponent } from './components/card/card-back/card-back-right/card-back-right.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ResidencesModule
  ],
  exports: [
    SideMenuComponent,
    TopbarComponent,
    WrapperComponent,
    CardComponent
  ],
  declarations: [
    SideMenuComponent,
    TopbarComponent,
    WrapperComponent,
    MenuToggleComponent,
    NotFoundComponent,
    CardComponent,
    CardFrontComponent,
    CardFrontIconsComponent,
    CardFrontDescriptionComponent,
    CardBackComponent,
    CardBackLeftComponent,
    CardBackRightComponent
  ],
  providers: [
    AppGuard,
    AuthService,
    LocalStorageService,
    SocketIoService,
    SyncService,
    SideBarService,
    TitleService,
    TopBarEmitter,
    CardEmitter
  ]
})
export class SharedModule { }
