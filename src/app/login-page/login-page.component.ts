import { Component, OnInit } from '@angular/core';
import { UserData } from '../Clsses/UserDataClass';
import AccessControl from '../Clsses/AccessControlClass';
import apiservice from '../Services/apiservices';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  user = new UserData();
  rememberMe;
  encryptMode: boolean;
  wrongemail:string="false";
  wrongpass:string="false";
  invalidemail:string="false";
 invalidd;
 remeber;
 encrpted;
  conversionOutput: string;
keySize = 256;
 ivSize = 128;
 iterations = 100;
 transitmessage;
message = "Hello World";


  constructor(private apiservice:apiservice,  private router: Router , private cookieService: CookieService) {
    this.encryptMode = true;
   }

  ngOnInit() {
    this.getData();
    localStorage.clear();
    this.encrption();

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
    this.Encrpt();
   
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
   this.Decrpt();
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
  encrption()
  {
    this.Encrpt();
    this.Decrpt();

  }

  Encrpt()
  {
  var salt = CryptoJS.lib.WordArray.random(128/8);
  
  var key = CryptoJS.PBKDF2(this.message, salt, {
      keySize: this.keySize/32,
      iterations: this.iterations
    });

  var iv = CryptoJS.lib.WordArray.random(128/8);
  
  var encrypted = CryptoJS.AES.encrypt(this.user.password, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  this.transitmessage= salt.toString()+ iv.toString() + encrypted.toString();
  this.cookieService.set('Password',  this.transitmessage);
}
Decrpt()
{
  this.transitmessage=this.cookieService.get('Password');
  var salt = CryptoJS.enc.Hex.parse(this.transitmessage.substr(0, 32));
  var iv = CryptoJS.enc.Hex.parse(this.transitmessage.substr(32, 32))
  var encrypted = this.transitmessage.substring(64);
  
  var key = CryptoJS.PBKDF2(this.message, salt, {
      keySize: this.keySize/32,
      iterations: this.iterations
    });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  this.user.password=decrypted.toString(CryptoJS.enc.Utf8);
  console.log('aaaaaaaaaaaaaaaaaaaa0', decrypted.toString(CryptoJS.enc.Utf8) );
}
}

