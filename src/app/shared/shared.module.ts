import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/auth/auth.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { SideBarService } from './services/side-bar/side-bar.service';
import { SocketIoService } from './services/socket-io/socket-io.service';
import { SyncService } from './services/sync/sync.service';
import { TitleService } from './services/title/title.service';

import { CardEmitter } from './emitters/card.emitter';
import { ResidenceEmitter } from './emitters/residence.emitter';
import { TopBarEmitter } from './emitters/top-bar.emitter';
import { SocketIoEmitter } from './emitters/socket-io.emitter';

import { AppGuard } from './guards/app.guards.service';

import { CardComponent } from './components/card/card.component';
import { CardBackComponent } from './components/card/card-back/card-back.component';
import { CardBackLeftComponent } from './components/card/card-back/card-back-left/card-back-left.component';
import { CardBackRightComponent } from './components/card/card-back/card-back-right/card-back-right.component';
import { CardFrontComponent } from './components/card/card-front/card-front.component';
import { CardFrontIconsComponent } from './components/card/card-front/card-front-icons/card-front-icons.component';
import { CardFrontDescriptionComponent } from './components/card/card-front/card-front-description/card-front-description.component';
import { MenuToggleComponent } from './components/top-bar/menu-toggle/menu-toggle.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopbarComponent } from './components/top-bar/top-bar.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { ButtonNewComponent } from './components/button-new/button-new.component';
import { ListComponent } from './components/list/list.component';
import { ButtonUpdateComponent } from './components/button-update/button-update.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SideBarComponent,
    TopbarComponent,
    MenuToggleComponent,
    NotFoundComponent,
    CardComponent,
    CardFrontComponent,
    CardFrontIconsComponent,
    CardFrontDescriptionComponent,
    CardBackComponent,
    CardBackLeftComponent,
    CardBackRightComponent,
    ButtonBackComponent,
    ButtonNewComponent,
    ButtonUpdateComponent,
    ListComponent
  ],
  exports: [
    SideBarComponent,
    TopbarComponent,
    CardComponent,
    ButtonBackComponent,
    ButtonNewComponent,
    ButtonUpdateComponent,
    ListComponent
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
    CardEmitter,
    ResidenceEmitter,
    SocketIoEmitter
  ]
})
export class SharedModule { }
