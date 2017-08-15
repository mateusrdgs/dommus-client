import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createProfileForm();
  }

  createProfileForm() {
    this.profileForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['a', Validators.required]
    });
  }

}
