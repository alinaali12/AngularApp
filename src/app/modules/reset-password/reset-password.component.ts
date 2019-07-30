import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';

import { ResetPasswordService } from 'src/app/services/ResetPassword/reset-password.service';
import { customPasswordCheck } from 'src/app/_helpers/password.validator';


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
  resetPasswordForm: FormGroup;

  constructor(private router: ActivatedRoute, private routerr:Router, location: Location, private  resetPasswordService: ResetPasswordService, private formBuilder:FormBuilder) { 
    var userName = location.path().slice(location.path().search("=")+1); //we get this by slicing from the location that the first = is found,till end
    this.currentUser = new User(userName,"");
  }


  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      pwd: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, {
      // validator: [MustMatch('pwd', 'confirmPassword'), customPasswordCheck('pwd')]
      validator: [MustMatch('pwd', 'confirmPassword')]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

  submitNewPassword() {
    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      console.log("Returning because invalid entry");
      return;
    }
    var res;
    
    this.resetPasswordService.sendUpdatedPassword(this.currentUser).subscribe(data =>{
      res = data;
      if (res == true){
        this.passwordUpdated = true;
        this.routerr.navigate(['/login']);
      } else {
        this.passwordUpdated = false;
      }
    } );
  }
}
