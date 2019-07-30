import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginModel } from '../classes/LoginModel';
import { Subject, Observable } from 'rxjs';
// import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public api="https://localhost:44347/api";
  public storageSub = new Subject<string>();

  constructor( private router: Router, private httpclient:HttpClient) {
  }
  canActivate() {
    var token = localStorage.getItem("jwt");
 if (token == null || token == undefined){
  this.router.navigate(["signin"]);
  return false;
 }else{

 const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': token
  })
};

  this.httpclient.post(this.api+"/Auth", "",httpOptions).subscribe(res=>{
    console.log(res);
    if (res=="Invalid token"){
      this.storageSub.next("jwt removed");
      return false;
    }
    if (res=="Valid Token"){
      
      this.router.navigate(["userlist"])
    return true;
    }else{
      this.router.navigate(["userlist"])

      return true;
    }
  });
 }
    
  //  this.router.navigate(["signin"]);
  //  return false;
  }
  userAuthentication(UserEmail, password){
     let loginmodel : LoginModel= new LoginModel();
     loginmodel.UserEmail =  UserEmail;
     loginmodel.Password = password;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpclient.post(this.api+"/Auth/login", loginmodel,{headers} );  }

    watchStorage(): Observable<any> {
      return this.storageSub.asObservable();
    }
  
  
}
