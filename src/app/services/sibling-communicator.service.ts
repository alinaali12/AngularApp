import { Injectable } from '@angular/core';
import { StudentRegisterationModel } from '../models/student-registeration-model';
import { Permission_URL } from '../models/Permission_URL';
import { SessionManagerService } from './session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class SiblingCommunicatorService {
  Record: StudentRegisterationModel;
  Urls : Permission_URL [];
  LoggedIn: boolean = this.loginService.isLoggedIn(); //Ensures that a url change doesnt reset the login

  timeLeft: number ;
  interval;

  private startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {  
        console.log('Timer: ',this.timeLeft, ' Interval:', this.interval);
        this.loginService.checkLogIn();
        this.LoggedIn=this.loginService.isLoggedIn();
        if (!this.LoggedIn)
          clearInterval(this.interval);
      }
      
    } ,1000)
   
  }

 StartTimer(){
  
    if (this.LoggedIn=this.loginService.isLoggedIn()){
      this.timeLeft=this.loginService.getRemainingTime();
      this.startTimer(); //After logging In
    }
    console.log("Login Check Called :",this.LoggedIn);
  }

  constructor(private loginService: SessionManagerService) { 
    this.StartTimer();
  }
  insertData(std:StudentRegisterationModel){
    this.Record=std;
  }
}
