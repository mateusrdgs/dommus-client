import { Account } from './account';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.accountForm  = this.formBuilder.group({
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
    }
  }

}
