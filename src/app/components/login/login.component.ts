import { DataService } from '../../services/dataService/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { NavbarService } from 'src/app/services/navbarService/navbar.service';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NavbarService]
})
export class LoginComponent implements OnInit {


  constructor(formBuilder: FormBuilder, private dataService: DataService, public nav: NavbarService, private router: Router, private bnIdle: BnNgIdleService) {


    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  loginForm: FormGroup;
  submitted = false;
  success = false;
  authCheck;
  encryptSecretKey = 'movie';
  timeLeft = 3;
  // interval;
  isEmailCorrect;
  isValid;
  ngOnInit() {
    this.retrieveCredentials();
    this.showHideNavbar();
  }
  showHideNavbar() {
    // const rememberMeCheck = localStorage.getItem('rememberMe');
    const loggedInCheck = sessionStorage.getItem('isLogin');
    // if (loggedInCheck === 'true' || rememberMeCheck === 'true') {
    if (loggedInCheck === 'true') {
      this.nav.show();
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('invalid form');
      console.log(this.findInvalidControls());

      return;
    }
    this.success = true;
    const { email } = this.loginForm.value;
    let { password } = this.loginForm.value;
    password = this.encryptData(password);
    console.log(password);


    const login = {
      email, password
    };
    console.log('sign in clicked');

    this.dataService.getAuthorization(login).subscribe((data) => {
      console.log('login success');

      this.authCheck = data; console.log(data);
      sessionStorage.setItem('isLogin', data.toString());
      // localStorage.setItem('rememberMe', this.RememberMe.toString());

      console.log(sessionStorage.getItem('isLogin').toString());
      this.storeCredentials();
      this.router.navigateByUrl('/movies');
      this.nav.show();


      this.bnIdle.startWatching(60).subscribe((res) => {
        if (res) {
          console.log('session expired');
          confirm('session expired');
        }
      });

    });
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.loginForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  storeCredentials() {
    const { email, password, } = this.loginForm.value;
    const rememberMeCheck = localStorage.getItem('rememberMeCheckbox');
    if (rememberMeCheck === 'true') {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
    else {
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
    }
  }
  retrievedEmail;
  retrievedpassword;
  retrievedRememberMeCB;
  retrieveCredentials() {

    const rememberMeCheck = localStorage.getItem('rememberMeCheckbox');
    if (rememberMeCheck === 'true') {
      this.retrievedEmail = localStorage.getItem('email');
      this.retrievedpassword = localStorage.getItem('password');
      this.retrievedRememberMeCB = localStorage.getItem('rememberMeCheckbox');

    }
    else {
      this.retrievedEmail = '';
      this.retrievedpassword = '';
      this.retrievedRememberMeCB = false;
    }
  }
  encryptData(data) {
    try {
      const key = '55a51621a6648525';
      const keyutf = CryptoJS.enc.Utf8.parse(key);
      const iv = CryptoJS.enc.Base64.parse(key);
      const enc = CryptoJS.AES.encrypt(data, keyutf, { iv });
      return enc.toString();
    } catch (e) { console.log(e); }

  }
  RememberMe(event: any) {
    localStorage.setItem('rememberMeCheckbox', event.target.checked);
    console.log(localStorage.getItem('rememberMeCheckbox'));
  }
  // CheckEmailField() {
  //   this.isEmailCorrect = 'false';
  //   const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
  //   const { email } = this.loginForm.value;
  //   const res = regex.test(email); // outputs true
  //   if (res) {
  //     this.isValid = 'true';
  //   } else {
  //     this.isValid = 'false';
  //   }
  //   // console.log(this.isValid);
  // }

}
export class Login {
  id?: number;
  email: string;
  password: string;

}
