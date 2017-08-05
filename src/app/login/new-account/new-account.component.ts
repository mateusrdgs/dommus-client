import { Account } from './account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { NewAccountService } from './new-account.service';

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
    private _newAccountService: NewAccountService
  ) { }

  ngOnInit() {
    this.accountForm  = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      pin: ['', Validators.pattern('[0-9]*')]
    });

    this.accountFormSubscription =
      this.accountForm.valueChanges
      .subscribe(() => {
        this.accountFormValid = this.accountForm.valid;
      });

  }

  onSubmit() {
    if (this.accountFormValid) {
      this.account = this.accountForm.value;
      this._newAccountService
        .postAccount(this.account)
        .then(response => {
          if (response) {
            console.log(response);
          }
        })
        .catch(error => {
          console.error(error.message || error._body || error);
        });
    }
  }

}
