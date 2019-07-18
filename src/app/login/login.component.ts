import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-service.service';
import { Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../classes/user';
import { nearer } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: User;
  private isValidatedUser:boolean;
  constructor(private _loginServive: LoginService, private router: Router) { 
    this.isValidatedUser = false;
  }
   ngOnInit() {
   }

   onClickSubmit(formData) {
     this._loginServive.validateLogin(formData.username, formData.pwd).subscribe((data)=>{
      console.log('response result',data);
      this.isValidatedUser = data; //returns true or false
      if (this.isValidatedUser) {
        this.currentUser = new User(formData.username, formData.pwd);
        this._loginServive.startNewSession(formData.username, formData.pwd);
        this._loginServive.currentUser.subscribe(x => this.currentUser = x);
        this._loginServive.startNewSession(formData.username,formData.pwd);
        
      } else {
        alert("Username or Password is incorrect!");
      }
    });
  
    

   }
}
