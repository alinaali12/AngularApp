import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/Login/login-service.service';
import { Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../../classes/user';
import { nearer } from 'q';
import { CookieService } from 'ngx-cookie-service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/ResetPassword/reset-password.service';

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
  public passwordSectionIsCollapsed;


  constructor(private fb: FormBuilder,private _loginServive: LoginService, private router: Router, private _cookieService: CookieService, private _resetPasswordService: ResetPasswordService) { 
    this.isValidatedUser = false;
    this.rememberMe = false;
    this.passwordSectionIsCollapsed = true;
    

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
    console.log("Accessing login to validate user");
      if (this.currentUser.userEmail=="" || this.currentUser.stringPassword == "") {
        return ;
      }

      console.log("trying to validate user");
      this._loginServive.validateLogin(this.currentUser.userEmail, this.currentUser.stringPassword).subscribe((data)=>{
      this.isValidatedUser = data;
      if (this.isValidatedUser) {
        console.log(this.rememberMe);


        //cookies----
        if (this.rememberMe) {
          this._cookieService.set('username',this.currentUser.userEmail);
          this._cookieService.set('password', this.currentUser.stringPassword);
          this._cookieService.set('remember','true');
        } else {
          //delete any cookie with this username and password
          this._cookieService.delete('username',this.currentUser.userEmail);
          this._cookieService.delete('password',this.currentUser.stringPassword);
          this._cookieService.delete('remember','true');
        }
        //---------

        this.currentUser = new User(this.currentUser.userEmail, this.currentUser.stringPassword);
        this._loginServive.startNewSession(this.currentUser.userEmail, this.currentUser.stringPassword);
                
      } else {
        alert("Username or Password is incorrect!");
      }
    });
  
    

   }

   toggleForgotPasswordSection()
   {
     console.log("Toggling .......");
    this.passwordSectionIsCollapsed = false;
   }

   forgotPassword() { 
     if (this.currentUser.userEmail!="") {
      console.log("Here we go again.. you forgot your password AGAIN",this.currentUser.userEmail);
      this._resetPasswordService.sendResetPasswordRequest(this.currentUser.userEmail).subscribe(data=> {
        let response = data;
        if (response == true) {
          console.log ("Returning",response,"from reset api service");
          console.log("Email sent successfully");
          return true;
        }
        console.log("User doesn't exist");
        return false;
      } );
    }
    console.log("Empty user email passed");
  }
}
