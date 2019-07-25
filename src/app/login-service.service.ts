import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usermodel } from './usermodel';
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserLogin } from './UserLogin';
import { constants } from 'os';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  authenticate;
  url = 'https://localhost:44347/api/UserLoginInfoes';
  constructor(private http: HttpClient) { }
  checkUserLogin(User: UserLogin) {
    console.log('s', User);
    this.authenticate = this.http.post(this.url + '/' + 'check', User, {responseType: 'text'});
    return this.authenticate;
  }
  setAuthentication(auth) {
    console.log('set', auth);
    this.authenticate = auth;
  }
  getAuthentication() {
  console.log('getauth', this.authenticate);
  if (this.authenticate === 'found') {
    return true;
  } else {
    return false;
  }
  }
}
