import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { User } from './../user';
import { UsersService } from './../users.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.styl']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;
  private _newUser: User;
  isUserAdmin = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    this.newUserForm = this._formBuilder.group({
      name: ['', Validators.required],
      type: ['false', Validators.required]
    });
  }

  onSubmit() {
    if (this.newUserForm.valid) {
      this._newUser = new User(this.newUserForm.value['name'], this.newUserForm.value['type']);
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
    this.newUserForm.addControl('adminPin', new FormControl('', [Validators.required]));
  }

  removeAdminPinField() {
    this.newUserForm.removeControl('adminPin');
  }

  private createNewUser(newUser: User) {
    this._usersService
      .createUser(newUser)
      .then(response => console.log(response))
      .catch(error => console.error(error._body));
  }
}
