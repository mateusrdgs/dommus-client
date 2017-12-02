import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../application/users/classes/user';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { UrlCreatorService } from '../../../../shared/services/url-creator/url-creator.service';

import { UserEmitter } from '../../../../shared/emitters/user.emitter';

import { viewAnimation } from '../../../../shared/animations/view.animation';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.styl'],
  animations: [viewAnimation],
  host: { '[@viewAnimation]': '' }
})
export class UsersComponent implements OnInit {

  userPinForm: FormGroup;
  openModal: boolean;
  users: User[];
  idUser: string;
  items = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _urlCreatorService: UrlCreatorService,
    private _userEmitter: UserEmitter,
    private _router: Router,
    private _remoteService: RemoteService
  ) { }

  ngOnInit() {
    this.startUserPinForm();
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['users'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const users = response.json()['Users'];
            this.users = this.iterateOverUsers(users);
            this.createArrayOfItems(this.users);
          }
        })
        .unsubscribe();
  }

  createArrayOfItems(users: User[]): any {
    for (let index = 0; index < 4; index++) {
      this.items.push(users[index] || undefined);
    }
  }

  iterateOverUsers(users: any): User[] {
    if (Array.isArray(users)) {
      return users.map(user => {
        const { _id, name, isAdmin } = user;
        return new User(name, isAdmin === 'true', _id);
      });
    }
  }

  startUserPinForm() {
    this.userPinForm = this._formBuilder.group({
      pin: ['', Validators.required]
    });
  }

  onCloseModal(event) {
    this.openModal = event;
  }

  onSubmit() {
    if (this.userPinForm.valid) {
      const { pin } = this.userPinForm.value,
            url = `${this._urlCreatorService.createUrl('users', 'id', { idUser: this.idUser })}validate`;
      this._remoteService
          .postResources(url, { pin })
          .map(response => response.json()['isValid'])
          .subscribe(response => {
            this._userEmitter.emitCorrectPassword(response);
          });
    }
  }

  onAdminChosen(event) {
    const { idUser, isAdmin } = event;
    if (isAdmin) {
      this.openModal = true;
      this.idUser = idUser;
    } else {
      this._userEmitter.emitCorrectPassword(true);
    }
  }

}
