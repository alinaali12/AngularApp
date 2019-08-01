import { Component, OnInit } from '@angular/core';
import { signin } from '../classes/sign-in';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  private isValidatedUser:boolean;
  currentUser: signin;
  rememberme:boolean = false;
   password: string = ":"
  constructor(private  service:UserService, private router:Router, private localStorage:LocalStorageService) { }

  ngOnInit() {
    console.log('data');
    this.password = (this.localStorage.retrieve('password'));
    console.log(this.password);
  }
  OnSubmit(useremail:string, userpassword:string){
    console.log("button pressed", useremail , userpassword, this.rememberme)
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
    if (this.rememberme==false){
    this.service.startNewSession(useremail,userpassword);
    console.log("Session",data);
    }else{
      let sign_user= new signin(); 
    
      // this.sign_user = new User(username,password);
      sign_user.authorize= window.btoa(useremail + ':' + userpassword);

      this.localStorage.store('currentUser', JSON.stringify(sign_user));
      this.localStorage.store('password', userpassword);

      this.service.storageSub.next("session started");
      this.router.navigate(['/create-user']);

    }
  }
  });
}

remembermechange(){
  console.log(this.rememberme)
  if (this.rememberme==true){
    this.rememberme = false;
  }else{
    this.rememberme = true;
  }
}
    
}