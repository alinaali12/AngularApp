import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(formBuilder: FormBuilder, private dataService: DataService) {
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
  interval;
  isEmailCorrect;
  isValid;
  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.success = true;
    const { email, rememberMe } = this.loginForm.value;
    let { password } = this.loginForm.value;
    password = this.encryptData(password);

    const login = {
      email, password
    };

    this.dataService.getAuthorization(login).subscribe((data) => {
      this.authCheck = data; console.log(data);
      sessionStorage.setItem('isLogin', data.toString());
      // localStorage.setItem('rememberMe', rememberMe.toString());

      console.log(sessionStorage.getItem('isLogin').toString());



    });
    // this.interval = setInterval(() => {
    //   if (this.timeLeft > 0) {
    //     this.timeLeft--;
    //     console.log(this.timeLeft);

    //   }

    //   if (this.timeLeft === 0) {
    //     const result = confirm('Do you want to do this?');
    //     if (result) {
    //       console.log('ok clicked');
    //     } else {
    //       console.log('cancel clicked');
    //     }

    //     return;
    //   }
    // }, 1000);



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
    localStorage.setItem('rememberMe', event.target.checked);
    console.log(localStorage.getItem('rememberMe'));
  }
  CheckEmailField() {
    this.isEmailCorrect = 'false';
    const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
    const { email } = this.loginForm.value;
    const res = regex.test(email); // outputs true
    if (res) {
      this.isValid = 'true';
    } else {
      this.isValid = 'false';
    }
    console.log(this.isValid);
  }

}
export class Login {
  id?: number;
  email: string;
  password: string;

}
