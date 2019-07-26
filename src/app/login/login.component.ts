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
  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.success = true;
    const { email } = this.loginForm.value;
    let { password } = this.loginForm.value;
    password = this.encryptData(password);

    const login = {
      email, password
    };

    this.dataService.getAuthorization(login).subscribe((data) => { this.authCheck = data; console.log(data); });


  }
  encryptData(data) {
    try {
      const key = '55a51621a6648525';
      const keyutf = CryptoJS.enc.Utf8.parse(key);
      const iv = CryptoJS.enc.Base64.parse(key);
      const enc = CryptoJS.AES.encrypt(data, keyutf, { iv: iv });
      return enc.toString();
    } catch (e) { console.log(e); }

  }

}
export class Login {
  id?: number;
  email: string;
  password: string;

}
