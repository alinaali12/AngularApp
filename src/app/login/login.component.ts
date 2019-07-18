import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private _loginServive: LoginService) { }
   ngOnInit() {
   }
   onClickSubmit(formData) {
     console.log(this._loginServive.validateLogin(formData.username, formData.pwd).subscribe((data)=>{
      console.log('response result',data);
    }));
    //  alert('Your Email is : ' + formData.username+'\n and password is :'+formData.pwd);
   }
}
