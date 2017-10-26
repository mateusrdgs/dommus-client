import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { RemoteService } from './../../../../shared/services/remote/remote.service';
import { UrlCreatorService } from './../../../../shared/services/url-creator/url-creator.service';

import { User } from './../../../../application/users/classes/user';

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.styl']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;
  openModal: boolean;
  isAdmin: boolean;
  private _newUser: User;
  fields =
  [
    {
      label: 'No',
      value: false
    },
    {
      label: 'Yes',
      value: true
    }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _remoteService: RemoteService,
    private _urlCreatorService: UrlCreatorService
  ) { }

  ngOnInit() {
    this.newUserForm = this._formBuilder.group({
      name: ['', Validators.required],
      isAdmin: [false, Validators.required]
    });
  }

  onSubmit() {
    if (this.newUserForm.valid) {
      const { name, isAdmin } = this.newUserForm.value;
      if (isAdmin && !this.openModal) {
        this.newUserForm.addControl('password', new FormControl('', [Validators.required]));
        this.openModal = true;
      } else if (isAdmin && this.openModal) {
        const { pin, password } = this.newUserForm.value,
        body = { name, isAdmin, pin, password };
        this.createNewUser(body);
      }
    }
  }

  onCloseModal(openModal) {
    this.openModal = openModal;
    this.newUserForm.removeControl('password');
  }

  onChange() {
    if (this.isAdmin) {
      this.newUserForm.removeControl('pin');
    } else {
      this.newUserForm.addControl('pin', new FormControl('', [Validators.required]));
    }
    this.isAdmin = !this.isAdmin;
  }

  private createNewUser(body: any) {
    const url = this._urlCreatorService.createUrl('users', 'new');
    this._remoteService
        .postResources(url, body)
        .map(response => response.json()['User'])
        .subscribe(response => response);
  }
}
