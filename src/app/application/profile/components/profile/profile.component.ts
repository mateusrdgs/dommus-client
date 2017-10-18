import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TopBarEmitter } from './../../../../shared/emitters/top-bar.emitter';

import Profile from '../../classes/profile';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  updateProfileForm: FormGroup;
  profile: Profile;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.extractDataFromResolver();
  }

  extractDataFromResolver() {
    this._activatedRoute.data
        .map(response => response['profile'])
        .subscribe(response => {
          if (response.hasOwnProperty('status') && response.status === 200) {
            const { _id, email } = response.json()['Account'];
                  this.profile = new Profile(_id, email);
            this.createUpdateProfileForm(this.profile);
          } else {
            console.error(response);
          }
        }, error => console.error(error));
  }

  createUpdateProfileForm(profile: Profile): void {
    this.updateProfileForm = this._formBuilder.group({
      email: [profile.Email, [Validators.required, Validators.email]]
    });
    console.log(this.updateProfileForm);
  }

  onSubmit() {
    if (this.updateProfileForm.valid) {
      const { email } = this.updateProfileForm.value;
      this.profile.Email = email;
      console.log(email);
    } else {
      console.log('Invalid');
    }
  }

}
