import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../UserLogin';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  User = new UserLogin();
  obj;
  Valid;
  constructor(private loginS: LoginServiceService, private route: Router) { }
  ngOnInit() {
  }
  GetData() {
    console.log('userinfo', this.User.Email + this.User.Password);
    // this.loginS.checkUserLogin(this.User);
    this.loginS.checkUserLogin(this.User).subscribe(data => {
      this.setData(data);
      console.log('auth', data);
      this.route.navigate(['/front-page']);
  });
}
    setData(data) {
      this.loginS.setAuthentication(data);
    }
    ValidateEmail() {
      const regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
      const res = regex.test(this.User.Email); // outputs true
      if (res) {
        this.Valid = 'true';
      } else {
        this.Valid = 'false';
      }
      console.log(this.Valid);
    }
}
