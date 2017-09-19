import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../shared/services/auth/auth.service';
import { LocalStorageService } from './../shared/services/local-storage/local-storage.service';
import { LoginService } from './login.service';

import { TopBarEmitter } from './../shared/emitters/top-bar.emitter';

import { Account } from './new-account/account';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  account: Account;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _localStorageService: LocalStorageService,
    private _topbarEmitter: TopBarEmitter,
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
    const isUserLoggedIn = this._authService.isLoggedIn('Dommus');
    if (isUserLoggedIn) {
      this._topbarEmitter.stateEmitter.emit(isUserLoggedIn);
      this._router.navigateByUrl('/home');
    }
  }
}
