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
  private _newUser: User;
  isUserAdmin = false;
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
      const { name, isAdmin, pin } = this.newUserForm.value;
      this._newUser = new User(name, isAdmin, '', pin);
      this.createNewUser(this._newUser);
    }
  }

  onChange(value) {
    if (value) {
      this.isUserAdmin = true;
      this.generateAdminPinField();
    } else {
      this.isUserAdmin = false;
      this.removeAdminPinField();
    }
  }

  generateAdminPinField() {
    this.newUserForm.addControl('pin', new FormControl('', [Validators.required]));
  }

  removeAdminPinField() {
    this.newUserForm.removeControl('pin');
  }

  private createNewUser(newUser: User) {

  }
}
