import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import{HttpHeaders} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Register} from "../app/register";
import 'cors';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _url: string;
  Header:any;
  Token:any;

  constructor(private http:HttpClient) { 
    this._url = "https://localhost:44347/api/Logins";
    const headerSettings: {[name:string]: string | string[];} = {};
    this.Header = new HttpHeaders(headerSettings);
  }

  public validateLogin(username:string,stringpassword:string ) {
    console.log(stringpassword,username);
    
    var response= this.http.get<boolean>(this._url, {
      params: {
        userName: username,
        stringPassword:stringpassword
      }
    });
    console.log('response',response);
    return response;
  }
}


