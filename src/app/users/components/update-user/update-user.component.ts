import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../classes/user';

@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.styl']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['user'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const { _id, name, isAdmin } = response.json()['User'],
                  user = new User(name, isAdmin, _id);
            this.createUpdateUserForm(user);
          }
        });
  }

  createUpdateUserForm(user: User) {
    this.updateUserForm = this._formBuilder.group({
      name: [user.Name, Validators.required],
      isAdmin: [user.IsAdmin, Validators.required]
    });
  }

}
