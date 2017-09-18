import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { LocalStorageService } from './../shared/services/local-storage.service';
import { Account } from './new-account/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  account: Account;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.account = this.loginForm.value;
      this._loginService
          .loginAccount(this.account)
          .then(response => {
            if (response) {
              this.redirectToHome();
            }
          });
    }
  }

  redirectToHome() {
    if (this._localStorageService.getToken('Dommus')) {
      this._router.navigateByUrl('/home');
    }
  }
}
