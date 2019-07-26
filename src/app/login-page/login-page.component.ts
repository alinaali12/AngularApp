import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../models/login-info';
import { CheckloginService } from '../services/checklogin.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  User : LoginInfo = new LoginInfo;
  constructor(private loginService: CheckloginService) { }

  onSubmit(email: string,pass: string){
    console.log('Values:',email,pass);
    this.User.email=email;
    this.User.password=pass;

    if (this.loginService.SendData(this.User)){
      //Goto the Rest of the App
    }else{
      //Display Error that File Not found.
    }
  }
  ngOnInit() {
  }

}
