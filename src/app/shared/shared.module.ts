import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth/auth.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { SideBarService } from './services/side-bar/side-bar.service';
import { SocketIoService } from './services/socket-io/socket-io.service';
import { SyncService } from './services/sync/sync.service';
import { TitleService } from './services/title/title.service';
import { RemoteService } from './services/remote/remote.service';

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
import { MenuToggleComponent } from './components/top-bar/menu-toggle/menu-toggle.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TopbarComponent } from './components/top-bar/top-bar.component';
import { ButtonBackComponent } from './components/button-back/button-back.component';
import { ButtonNewComponent } from './components/button-new/button-new.component';
import { ListComponent } from './components/list/list.component';
import { ButtonUpdateComponent } from './components/button-update/button-update.component';
import { UrlCreatorService } from './services/url-creator/url-creator.service';
import { WindowService } from './services/window/window.service';
import { ButtonSubmitComponent } from './components/button-submit/button-submit.component';
import { FormControlTextComponent } from './components/form-control-text/form-control-text.component';
import { FormControlSelectComponent } from './components/form-control-select/form-control-select.component';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { FormControlNumberComponent } from './components/form-control-number/form-control-number.component';
import { TaskFormComponent } from './components/card/card-back/card-back-left/task-form/task-form.component';
import { FormControlDateComponent } from './components/form-control-date/form-control-date.component';
import { FormControlHourComponent } from './components/form-control-hour/form-control-hour.component';
import { FormControlSwitchComponent } from './components/form-control-switch/form-control-switch.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { CardFrontContainerComponent } from './components/card/card-front/card-front-container/card-front-container.component';
import { CardFrontContainerDescriptionComponent } from './components/card/card-front/card-front-container/card-front-container-description/card-front-container-description.component';
import { CardFrontContainerDataComponent } from './components/card/card-front/card-front-container/card-front-container-data/card-front-container-data.component';
import { CardFrontContainerIconComponent } from './components/card/card-front/card-front-container/card-front-container-icon/card-front-container-icon.component';
import { CardFrontContainerRangeComponent } from './components/card/card-front/card-front-container/card-front-container-range/card-front-container-range.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    SideBarComponent,
    TopbarComponent,
    MenuToggleComponent,
    NotFoundComponent,
    CardComponent,
    CardFrontComponent,
    CardFrontIconsComponent,
    CardBackComponent,
    CardBackLeftComponent,
    CardBackRightComponent,
    ButtonBackComponent,
    ButtonNewComponent,
    ButtonUpdateComponent,
    ButtonSubmitComponent,
    ListComponent,
    FormControlTextComponent,
    FormControlSelectComponent,
    CapitalizePipe,
    FormControlNumberComponent,
    TaskFormComponent,
    FormControlDateComponent,
    FormControlHourComponent,
    FormControlSwitchComponent,
    ButtonDeleteComponent,
    CardFrontContainerComponent,
    CardFrontContainerDescriptionComponent,
    CardFrontContainerDataComponent,
    CardFrontContainerIconComponent,
    CardFrontContainerRangeComponent,
    CurrentUserComponent
  ],
  exports: [
    SideBarComponent,
    TopbarComponent,
    CardComponent,
    ButtonBackComponent,
    ButtonDeleteComponent,
    ButtonNewComponent,
    ButtonUpdateComponent,
    ButtonSubmitComponent,
    FormControlTextComponent,
    FormControlSelectComponent,
    FormControlNumberComponent,
    FormControlDateComponent,
    FormControlHourComponent,
    ListComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
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
        SocketIoEmitter,
        RemoteService,
        WindowService,
        UrlCreatorService,
        CapitalizePipe
      ]
    };
  }
}
