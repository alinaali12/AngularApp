import { Component, OnInit } from '@angular/core';
import { signin } from '../classes/sign-in';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private isValidatedUser:boolean;
  currentUser: signin;
  constructor(private  service:UserService) { }

  ngOnInit() {
  }
  OnSubmit(useremail:string, userpassword:string){
    let userobj:signin;
     userobj= new signin();  
 userobj.Email=useremail;
 userobj.Password=userpassword;
 this.service.validateLogin(useremail,userpassword).subscribe(
   data=>
   {
  this.isValidatedUser=data
  if(this.isValidatedUser==true)
  {
    this.service.startNewSession(useremail,userpassword);
    console.log("Session",data);
  }
  });
}
    
}