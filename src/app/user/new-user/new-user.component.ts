import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from './../user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.styl']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;
  private _newUser: User;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.newUserForm = this._formBuilder.group({
      name: ['', Validators.required],
      type: ['false', Validators.required]
    });
  }

  onSubmit() {
    if (this.newUserForm.valid) {
      this._newUser = new User('', this.newUserForm.value['name'], this.newUserForm.value['type']);
      this.createNewUser(this._newUser);
    }
  }

  private createNewUser(newUser: User) {
    this._userService
      .createUser(newUser)
      .then(response => console.log(response))
      .catch(error => console.error(error._body));
  }
}
