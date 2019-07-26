import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  _resetPasswordUrl = "https://localhost:44347/api/email";
  _submitnewPasswordUrl = "https://localhost:44347/api/Logins/";
  constructor(private http:HttpClient) {
  }

  sendResetPasswordRequest(userEmail:string) {
    console.log("Sending reset request to ",this._resetPasswordUrl+"?to="+userEmail, "for user",userEmail);
    return this.http.get<boolean>(this._resetPasswordUrl+"?to="+userEmail);
  }

  sendUpdatedPassword(currentUser : User) {
    //for PUT request API url is https://localhost:44347/api/Logins/saba_tahir@gmail.com
    console.log("This is being sent",this._submitnewPasswordUrl+currentUser.userEmail);
    //data should be of this type
    // {
    //   "stringPassword": null,
    //   "userId": 1,
    //   "userEmail": "sej@ciklum.com",
    //   "password": "QpHN3pV5cDiyW1JclRya6Q=="
    // }
    const data = JSON.stringify(currentUser);
    console.log("and here is data",data);
    return this.http.put<boolean>(this._submitnewPasswordUrl+currentUser.userEmail, data);
  }
}
