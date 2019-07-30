import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../UserLogin';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  User = new UserLogin();
  obj;
  Valid;
  remember;
  Wronginput = 'false';
  Wrongpass = 'false';
  forgetClicked = 'false';
  checkSend = 'false';
  encstring;
  decstring;
  passwordmsg;
  passwordLengthMatch;
  passwordData = '';
  constructor(private loginS: LoginServiceService, private route: Router, private cookieService: CookieService) { }
  ngOnInit() {
      if (this.cookieService.get('useremail')) {
        this.remember = true;
      }
      this.User.Email = this.cookieService.get('useremail');
      this.User.Password = this.decryptData(this.cookieService.get('password'));
      this.encryptData(this.User.Password);
  }
  GetData() {
    console.log('userinfo', this.User.Email + this.User.Password);
    // this.loginS.checkUserLogin(this.User);
    this.loginS.checkUserLogin(this.User).subscribe(data => {
      this.setData(data);
      console.log('auth', data);
      if (data === 'found') {
      this.route.navigate(['/front-page']);
      }
      if (data === 'not found' && this.forgetClicked === 'false') {
        this.Wronginput = 'true';
      }
      if (data === 'invalid passowrd') {
       this.Wrongpass = 'true';

      }
  });
}
    setData(data) {
      console.log('rem', this.remember);
      this.loginS.setAuthentication(data);
      if (data === 'found' && this.remember === true) {
        this.cookieService.put('useremail', this.User.Email);
        this.cookieService.put('password', this.encryptData(this.User.Password));
      }
    }
    ValidateEmail() {
      this.Wronginput = 'false';
      const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
      const res = regex.test(this.User.Email); // outputs true
      if (res) {
        this.Valid = 'true';
      } else {
        this.Valid = 'false';
      }
      console.log(this.Valid);
  }
  ForgetMethod() {
    this.Wronginput = 'false';
    this.Wrongpass = 'false';
    this.forgetClicked = 'true';
    console.log('forget');
  }
  cancel() {
    this.forgetClicked = 'false';
    this.checkSend = 'false';
  }
  SendEmail() {
    this.checkSend = 'true';
    this.Wronginput = 'false';
    this.Wrongpass = 'false';
    localStorage.setItem('resetmail', this.User.Email);
    console.log('semdemail', this.User.Email);
    this.loginS.ForgetLinkSend(this.User).subscribe( data => {
        console.log(data);
      });
  }
  check() {
    this.remember = true;
    console.log('check');
  }
  encryptData(data) {
   this.encstring = CryptoJS.AES.encrypt(data.trim(), 'E546C8DF278CD5931069B522E695D4F2').toString();
   return this.encstring;
  }
  decryptData(data) {
     return CryptoJS.AES.decrypt (data, 'E546C8DF278CD5931069B522E695D4F2').toString(CryptoJS.enc.Utf8);
  }
  onKeydown(event) {
      console.log('key');
      console.log(this.User.Password.length);
      if (this.User.Password.length < 6 || this.User.Password.length > 20 ) {
          this.passwordLengthMatch = 'false';
          console.log('nogoodlength');
      } else {
        this.passwordLengthMatch = 'true';
        this.Wrongpass = 'false';
        const strong = new RegExp('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{10,20}$');
        const medium = new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,10}$');
        const weak = new RegExp('(?=.{6}$)');
        if (medium.test(this.User.Password)) {
          this.passwordmsg = 'medium';
        } else if (strong.test(this.User.Password)) {
          this.passwordmsg = 'strong';
        } else if (weak.test(this.User.Password)) {
          this.passwordmsg = 'weak';
        } else {
          this.passwordmsg = 'outofrange';
        }
        console.log(this.passwordmsg);
      }
    }
}
