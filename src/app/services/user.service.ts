import { Injectable } from '@angular/core';

import { signin } from '../classes/sign-in';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public timeBegan = null
  public timeStopped: any = null
  public stoppedDuration: any = 0
  public started = null
  public running = false
  public blankTime = "00:00"
  public time = "00:00"


  public currentUser: Observable<signin>;
  readonly rootUrl = 'https://localhost:44347/';
  //var url=this.rootUrl + 'api/Login_form';
  private currentUserSubject : BehaviorSubject<signin>;
  sign_user:signin;
  public storageSub = new Subject<string>();

  
  constructor(private http: HttpClient,private router: Router) { }
 
  
  registerUser(user : signin){
    console.log("msg", user)
   var url=this.rootUrl + 'api/Login_form';
    return this.http.post(url, user);
  }
  public startNewSession(username:string, password: string) {

    this.sign_user= new signin(); 
    
        // this.sign_user = new User(username,password);
        this.sign_user.authorize= window.btoa(username + ':' + password);
         sessionStorage.setItem('currentUser', JSON.stringify(this.sign_user));
    
        this.timmerstart();
        //this.currentUserSubject.next(this.sign_user);
        this.router.navigate(['/create-user']);
        return this.sign_user;
      }
 
      public validateLogin(username:string,stringpassword:string ) {

        var url=this.rootUrl+'api/Login_form';
        return this.http.get<boolean>(url, {
          params: {
            userName: username,
            stringPassword:stringpassword
          }
        });
      }
      get isLoggedIn() {
        return JSON.parse(sessionStorage.getItem('currentUser'));
      }

      watchStorage(): Observable<any> {
        return this.storageSub.asObservable();
      }

      timmerstart(){
        
        if (this.running) {
          clearInterval(this.started);
         }
         
         if (this.timeBegan === null) {
           this.reset();
           this.timeBegan = new Date();
         }
         if (this.timeStopped !== null) {
           let newStoppedDuration: any = (+new Date() - this.timeStopped)
           this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
         }
         this.started = setInterval(this.clockRunning.bind(this), 10);
         this.storageSub.next("session started");

         this.running = true;

      }

      stop() {
        this.running = false;
        this.timeStopped = new Date();
        clearInterval(this.started);
      }
      reset() {
        this.running = false;
        clearInterval(this.started);
        this.stoppedDuration = 0;
        this.timeBegan = null;
        this.timeStopped = null;
        this.time = this.blankTime;
      }
      zeroPrefix(num, digit) {
        let zero = '';
        for (let i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      }
      clockRunning() {
        let currentTime: any = new Date()
        let timeElapsed: any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
        let hour = timeElapsed.getUTCHours()
        let min = timeElapsed.getUTCMinutes()
        let sec = timeElapsed.getUTCSeconds()
        let ms = timeElapsed.getUTCMilliseconds();
        this.time =
    
          this.zeroPrefix(min, 2) + ":" +
          this.zeroPrefix(sec, 2); // + "." ;
        if (this.time == "00:10") {
         // clearInterval(this.started); // interval closed
         this.storageSub.next("session expired");
          this.stop();
    
          this.reset();
          
        }
      }
    
}
    
    
