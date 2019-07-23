import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import{HttpHeaders} from '@angular/common/http';
import {from, Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Register} from "../../register";
import 'cors';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _url: string;
  Header:any;
  Token:any;
  public currentUser: Observable<User>;
  private currentUserSubject : BehaviorSubject<User>;
  private loggedInUser : User;
  constructor(private http:HttpClient, private router: Router) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this._url = "https://localhost:44347/api/Logins";
    // const headerSettings: {[name:string]: string | string[];} = {};
    // this.Header = new HttpHeaders(headerSettings);
  }

  public validateLogin(username:string,stringpassword:string ) {

    var response= this.http.get<boolean>(this._url, {
      params: {
        userName: username,
        stringPassword:stringpassword
      }
    });
    console.log('response',response);
    return response;
  }

  public startNewSession(username:string, password: string) {

    this.loggedInUser = new User(username,password);
    this.loggedInUser.authorizationData = window.btoa(username + ':' + password);
    sessionStorage.setItem('currentUser', JSON.stringify(this.loggedInUser));

    this.currentUserSubject.next(this.loggedInUser);
    this.router.navigate(['/home']);
    return this.loggedInUser;
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
  }



  get isLoggedIn() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
}


