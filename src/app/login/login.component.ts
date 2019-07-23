import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login/login-service.service';
import { Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../classes/user';
import { nearer } from 'q';
import { CookieService } from 'ngx-cookie-service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentUser: User;
  private isValidatedUser:boolean;
  private rememberMe : boolean;
  loginForm: FormGroup;


  constructor(private fb: FormBuilder,private _loginServive: LoginService, private router: Router, private _cookieService: CookieService) { 
    this.isValidatedUser = false;
    this.rememberMe = false;
    
    // Validation checks
    
    this.loginForm = fb.group({
     pwd: ["", Validators.required]

    });
    // ------


    
    if(_cookieService.get('remember')) {
      var username =this._cookieService.get('username');
      var pwd =this._cookieService.get('password');
      this.rememberMe = true;
      this.currentUser = new User(username,pwd);
   } else {
    this.currentUser = new User("","");
   }
  
  
  }
   ngOnInit() {
   }

   setCheckbox() {
     this.rememberMe = !this.rememberMe;
   }
   onClickSubmit() {

      this._loginServive.validateLogin(this.currentUser.userName, this.currentUser.plainPassword).subscribe((data)=>{
      this.isValidatedUser = data;
      if (this.isValidatedUser) {
        console.log(this.rememberMe);


        //cookies----
        if (this.rememberMe) {
          this._cookieService.set('username',this.currentUser.userName);
          this._cookieService.set('password', this.currentUser.plainPassword);
          this._cookieService.set('remember','true');
        } else {
          //delete any cookie with this username and password
          this._cookieService.delete('username',this.currentUser.userName);
          this._cookieService.delete('password',this.currentUser.plainPassword);
        }
        //---------

        this.currentUser = new User(this.currentUser.userName, this.currentUser.plainPassword);
        this._loginServive.startNewSession(this.currentUser.userName, this.currentUser.plainPassword);
                
      } else {
        alert("Username or Password is incorrect!");
      }
    });
  
    

   }
}
