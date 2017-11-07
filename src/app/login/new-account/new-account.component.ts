import { Account } from './account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { LoginService } from './../login.service';

@Component({
  selector: 'new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.styl']
})
export class NewAccountComponent implements OnInit {

  account: Account;
  accountForm: FormGroup;
  accountFormValid: Boolean = false;
  accountFormSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _newAccountService: LoginService
  ) { }

  ngOnInit() {
    this.accountForm  = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      pin: ['', [Validators.required, Validators.pattern('[0-9]*')]]
    });
  }

  onSubmit() {
    if (this.accountFormValid) {
      this.account = this.accountForm.value;
      this._newAccountService.createNewAccount(this.account);
    }
  }

}
