import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TopBarEmitter } from './../shared/emitters/top-bar.emitter';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _topBarEmitter: TopBarEmitter
  ) { }

  ngOnInit() {
    this.createProfileForm();
    this._topBarEmitter.emitNewRouteTitle('Profile');
  }

  createProfileForm() {
    this.profileForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['a', Validators.required]
    });
  }

}
