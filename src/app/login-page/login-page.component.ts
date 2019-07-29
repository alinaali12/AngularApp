import { Component, OnInit } from '@angular/core';
import { UserData } from '../Clsses/UserDataClass';
import AccessControl from '../Clsses/AccessControlClass';
import apiservice from '../Services/apiservices';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user = new UserData();
  rememberMe;
  wrongemail:string="false";
  wrongpass:string="false";
  invalidemail:string="false";
 invalidd;
 remeber;
 encrpted;
  constructor(private apiservice:apiservice,  private router: Router , private cookieService: CookieService) { }

  ngOnInit() {
    this.getData();
    localStorage.clear();
    if(this.cookieService.get('Email'))
{
this.rememberMe= true;
}
  }
  OnSubmit()
  {
    console.log('User Name  : ', this.user.username);
    console.log('Password  : ', this.user.password);
    this.apiservice.EnterUser(this.user.username, this.user.password).subscribe(data=>{
      console.log('Response result',data);
      localStorage.setItem('token',data)
      this.setData();
      console.log(localStorage.getItem('token'));
      if(localStorage.getItem('token')=="false")
      {
        this.wrongemail="true";
        this.wrongpass="true";
      }
      
      if(localStorage.getItem('token')=="true")
      {

        this.router.navigate(['/logging']);
  
      }
      if(this.user.username === "" || this.user.password === "")
      {
        this.wrongpass = "true";
        this.wrongemail="true";
      }
     
    console.log('User Name  : ', this.user.username);
    console.log('Password  : ', this.user.password);
    });
  }
  setData()
  {
    console.log('remeber' , this.rememberMe);
    console.log('tokeeennn' , localStorage.getItem('token'));
    if(localStorage.getItem('token')=="true" && this.rememberMe==true)
  {
    this.cookieService.set('Email', this.user.username);
  //  this.encrpted = this.Encrdecr.set('123456$#@$^@1ERF' ,this.user.password);
    this.cookieService.set('Password', this.encrpted);
  }
  if(this.rememberMe==undefined)
  {
    this.cookieService.delete('Email');
    this.cookieService.delete('Password');
  }
  }
  getData()
  
  {
   // this.rememberMe=true;
    this.user.username=this.cookieService.get('Email');
    this.user.password=this.cookieService.get('Password');
  }
  ValidateEmail()
  {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if(this.user.username.match(mailformat))
  {
    this.invalidemail='false';
    this.invalidd='false';
  }
  else
  {
    this.invalidemail='true';
    this.invalidd='true';
  }

  }
 
}
