import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { ResetPasswordService } from 'src/app/services/ResetPassword/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  currentUser: User;
  sub:any;

  constructor(private router: ActivatedRoute, location: Location, private  resetPasswordService: ResetPasswordService) { 
    

    var userName = location.path().slice(location.path().search("=")+1); //we get this by slicing from the location that the first = is found,till end
    this.currentUser = new User(userName,"");
  }

  ngOnInit() {
  }

  submitNewPassword() {
    console.log("you entered this password ", this.currentUser.stringPassword,"against this email",this.currentUser.userEmail);
    this.resetPasswordService.sendUpdatedPassword(this.currentUser).subscribe((data)=> console.log("Password sent, the response is",data));
  }
}
