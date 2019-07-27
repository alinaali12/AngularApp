import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../UserLogin';
import { LoginServiceService } from '../login-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  password;
  confirmPassword;
  UserInfo = new UserLogin();
  constructor(private loginS: LoginServiceService, private route: Router) { }

  ngOnInit() {
  }
  SavePassword() {
    console.log(this.password + this.confirmPassword);
    if (this.password === this.confirmPassword) {
      this.UserInfo.Password = this.password;
      this.UserInfo.Email = localStorage.getItem('resetmail');
      this.loginS.SetEditUserInfo(this.UserInfo).subscribe(data => {
          this.EditInfo(data);
      });
    } else {
      console.log('no match');
    }
  }
  EditInfo(user: UserLogin) {
    console.log('edit', user);
    this.loginS.SaveChanges(user).subscribe(datas => {
      if (datas === null) {
        this.route.navigate(['/login']);
      }
  });
  }

}
