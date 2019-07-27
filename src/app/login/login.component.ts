import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../UserLogin';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  constructor(private loginS: LoginServiceService, private route: Router, private cookieService: CookieService) { }
  ngOnInit() {
      console.log(this.User.Email);
      console.log(this.cookieService.get('useremail'));
      this.User.Email = this.cookieService.get('useremail');
      this.User.Password = this.cookieService.get('password');
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
        this.cookieService.put('password', this.User.Password);
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
  passChange() {
    this.Wrongpass = 'false';
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
}
