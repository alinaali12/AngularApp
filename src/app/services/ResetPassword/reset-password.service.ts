import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  _resetPasswordUrl = "https://localhost:44347/api/email";
  _submitnewPasswordUrl = "https://localhost:44347/api/Logins/";
  _checkForValidResetRequest = "https://localhost:44347/api/ResetPasswords/";


  constructor(private http:HttpClient) {
  }

  sendResetPasswordRequest(userEmail:string) {
    console.log("Sending reset request to ",this._resetPasswordUrl+"?to="+userEmail, "for user",userEmail);
    return this.http.get<boolean>(this._resetPasswordUrl+"?to="+userEmail);
  }

  sendUpdatedPassword(currentUser : User) {
    return this.http.put<boolean>(this._submitnewPasswordUrl+currentUser.userEmail, {
      "stringPassword":  currentUser.stringPassword,
      "userEmail":   currentUser.userEmail
    });
  }

  checkIfResetRequestIsStillValid(currentUser:User ) {
    // First checking if the request exists or not for this password update through this api url https://localhost:44347/api/ResetPasswords/rima@ciklum.com
    return this.http.get<boolean>(this._checkForValidResetRequest+currentUser.userEmail);
  }

    

}
