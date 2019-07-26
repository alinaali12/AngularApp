import { Injectable } from '@angular/core';
import { CheckloginService } from './checklogin.service';
import { LoginInfo } from '../models/login-info';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {
 
 private  AddToLocalStorage(User:LoginInfo){
    localStorage.setItem(User.email,User.password);
  }

  GetFromLocalStorage(email : string){ // Will Return Remember Me Pass.
  //  console.log(this.CryptoService.decryptPass('T3kfpXkwta30icAXFdvH0Q=='));
    return this.CryptoService.decryptPass(localStorage.getItem(email));
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
    var expirationDate = sessionObject.expiresAt;
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

  async Login(User: LoginInfo,RememberMe : boolean){
    let status = false;
    let User_Manipulate  = Object.assign({},User);
    this.CryptoService.encryptPass(User_Manipulate);
    console.log(User_Manipulate);

    if (await this.loginService.SendData(User_Manipulate)){
        sessionStorage.setItem('currentLogin','true');
        sessionStorage.setItem('currentUser',User.email);
        this.setSessionTimer(30);
  
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
    console.log('session expired');  
  }

  constructor(private loginService: CheckloginService,private CryptoService: EncryptService) { }
}
