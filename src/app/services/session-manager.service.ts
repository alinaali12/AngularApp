import { Injectable } from '@angular/core';
import { CheckloginService } from './checklogin.service';
import { LoginInfo } from '../models/login-info';
import { EncryptService } from './encrypt.service';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  RememberMe : boolean = false;
 private  AddToLocalStorage(User:LoginInfo){
    localStorage.setItem('lastUser',JSON.stringify(User));
  
  }

  GetFromLocalStorage(){ // Will Return Remember Me Pass.
  
    var User= JSON.parse(localStorage.getItem('lastUser'));
    if (User)
      User.password= this.CryptoService.decryptPass(User.password);
   
    else
      User = new LoginInfo();

     
    return User;
  }

  isLoggedIn(){
    return (sessionStorage.getItem('currentLogin')=="true")? true: false;
  }

 private setSessionTimer(Minutes: number){
   
    var expirtydate: Date = new Date();
   expirtydate.setMinutes(expirtydate.getMinutes()+Minutes);
     console.log('Session expires at:',expirtydate);
      var sessionObject = {
      expiresAt: expirtydate,
      }
      sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));
  }

  getRemainingTime() {
    var currentDate = new Date();
    var sessionObject = JSON.parse(sessionStorage.getItem('sessionObject'));
    var expirationDate : string;
    if (sessionObject)
       expirationDate = sessionObject.expiresAt;
    else
        expirationDate = "";

    return Math.floor((Date.parse(expirationDate)  - Date.parse(currentDate.toString()))/1000);    
  }

  checkLogIn(){
    console.log('Checking Session Expiry');
    var currentDate = new Date();
    var sessionObject = JSON.parse(sessionStorage.getItem('sessionObject'));
    var expirationDate = sessionObject.expiresAt;
    if(Date.parse(currentDate.toString()) >= Date.parse(expirationDate)) {  
      this.Logout();
     
    }
    else
      console.log('Not Expired');
  }

  async CheckEmail(User:LoginInfo){
    console.log("Calling Login Service")
    return await this.loginService.CheckForEmail(User);
  }

  async Login(User: LoginInfo,RememberMe : boolean){
    let status = false;
    this.RememberMe=RememberMe;
    let User_Manipulate  = Object.assign({},User);
    this.CryptoService.encryptPass(User_Manipulate);
    console.log(User_Manipulate);

    if (await this.loginService.SendData(User_Manipulate)){
        sessionStorage.setItem('currentLogin','true');
        sessionStorage.setItem('currentUser',User.email);
        this.setSessionTimer(1);
  
      if (RememberMe)
        this.AddToLocalStorage(User_Manipulate);

      status=true;
    }
    else
      status=false;
  
    return status;
  }

 
  Logout(){
    sessionStorage.setItem('currentLogin','false');
    console.log('Logged Out',sessionStorage.getItem('currentUser'));
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('sessionObject');
    if (!this.RememberMe){
      localStorage.removeItem('lastUser');
    }
    console.log('session expired');  
  }

  constructor(private loginService: CheckloginService,private CryptoService: EncryptService) { }
}
