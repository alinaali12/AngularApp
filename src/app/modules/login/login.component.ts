import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/Login/login-service.service';
import { Router } from '@angular/router';
import { User } from '../../classes/user';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPasswordService } from 'src/app/services/ResetPassword/reset-password.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialModalComponent } from '../material-modal/material-modal.component';


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
  public credentialsValid = true;
  public emailNotSent = true;
  public resettingPassword= false;

  constructor(private fb: FormBuilder,private _loginServive: LoginService, private router: Router, private _cookieService: CookieService, private _resetPasswordService: ResetPasswordService, public dialog: MatDialog, private formBuilder:FormBuilder) { 
    this.isValidatedUser = false;
    this.rememberMe = false;
    this.passwordSectionIsCollapsed = true;
    

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
    this.loginForm = this.formBuilder.group({
    useremail: ['', [Validators.required]],
    pwd: ['', [Validators.required, Validators.minLength(8)]]
  }); 
  }

   // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  setCheckbox() {
    this.rememberMe = !this.rememberMe;
  }
   
  onClickSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Returning because invalid entry");
      return;
    }

    if (this.currentUser.userEmail=="" || this.currentUser.stringPassword == "") {
      return ;
    }

    console.log("trying to validate user");
    this._loginServive.validateLogin(this.currentUser.userEmail, this.currentUser.stringPassword).subscribe((data)=>{
    this.isValidatedUser = data;
    if (this.isValidatedUser) { //user is validated .. 
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
      // alert("Username or Password is incorrect!");
      this.credentialsValid = false;
      //   const dialogRef = this.dialog.open(MaterialModalComponent, {
      //     width: '250px',
      //     data: { message: "Incorrect Credentials" }
      //   });
      console.log("Invalid Login credentials");
    }
  });

  

  }

  toggleForgotPasswordSection()
  {
    this.credentialsValid = true;
    this.passwordSectionIsCollapsed = false;
  }

  forgotPassword() { 
     // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

     this.resettingPassword = true;
     if (this.currentUser.userEmail!="") {
      console.log("Here we go again.. you forgot your password AGAIN",this.currentUser.userEmail);
      this._resetPasswordService.sendResetPasswordRequest(this.currentUser.userEmail).subscribe(data=> {
        let response = data;
        if (response == true) {
          console.log ("Returning",response,"from reset api service");
          console.log("Email sent successfully");
          this.emailNotSent = false;
          return true;
        }
        console.log("User doesn't exist");
        return false;
      } );
    }
    console.log("Empty user email passed");
  }
}
