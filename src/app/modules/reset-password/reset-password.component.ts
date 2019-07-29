import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';
import { ResetPasswordService } from 'src/app/services/ResetPassword/reset-password.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})


export class ResetPasswordComponent implements OnInit {
  currentUser: User;
  sub:any;
  public passwordUpdated;
  public confirmPassword;
  loginForm: FormGroup;

  constructor(private router: ActivatedRoute, private routerr:Router ,location: Location, private  resetPasswordService: ResetPasswordService, private formBuilder:FormBuilder) { 
    var userName = location.path().slice(location.path().search("=")+1); //we get this by slicing from the location that the first = is found,till end
    this.currentUser = new User(userName,"");
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('pwd', 'confirmPassword')
  });
  }

  submitNewPassword() {
    if (this.confirmPassword=="" || this.currentUser.stringPassword == "") {
      return 
    }
    var res;
    console.log("you entered this password ", this.currentUser.stringPassword,"against this email",this.currentUser.userEmail);
    this.resetPasswordService.sendUpdatedPassword(this.currentUser).subscribe(data =>{
      res = data;
      if (res == true){
        this.passwordUpdated = true;
        this.routerr.navigate(['/login']);
      } else {
        this.passwordUpdated = false;
      }
    } );
    console.log("I am back in reset-password")
  }
}
