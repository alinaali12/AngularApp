import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usermodel } from './usermodel';
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserLogin } from './UserLogin';
import { constants } from 'os';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  authenticate;
  timer = 30;
  url = 'https://localhost:44347/api/UserLoginInfoes';
  EditUser;
  constructor(private http: HttpClient, private route: Router) { }
  checkUserLogin(User: UserLogin) {
    this.authenticate = this.http.post(this.url + '/' + 'check', User, {responseType: 'text'});
    return this.authenticate;
  }
  setAuthentication(auth) {
    this.authenticate = auth;
  }
  getAuthentication() {
  if (this.authenticate === 'found') {
    return true;
  } else {
    return false;
  }
  }
  startSession() {
    interval(1000 * 60).subscribe(x => {
      this.timer = this.timer - 1;
      if (this.timer === 28) {
      this.setAuthentication('false');
      this.route.navigate(['/login']);
      this.resetSession();
      }
    });
  }
  resetSession() {
    this.timer = 30;
  }
  getSession() {
    return this.timer;
  }
  ForgetLinkSend(user: UserLogin) {
    return this.EditUser = this.http.post(this.url + '/' + 'forget', user);
  }
  SetEditUserInfo(user: UserLogin): Observable<UserLogin> {
   this.EditUser = this.http.put(this.url + '/' + 'reset', user)
   .map((response: Response) => response as unknown as UserLogin);
   return this.EditUser;
  }
  SaveChanges(user: UserLogin) {
    return this.http.put(this.url + '/' + user.serialNo, user);

  }
}
